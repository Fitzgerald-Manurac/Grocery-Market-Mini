// Production-browser checks for precaching, offline reload, and startup retry.
import { existsSync } from 'node:fs';
import { preview } from 'vite';
import puppeteer from 'puppeteer-core';

const CHROME = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((path) => path && existsSync(path));
if (!CHROME) throw new Error('Chrome not found; set CHROME_PATH.');

const server = await preview({ preview: { host: '127.0.0.1', port: 4174, strictPort: true }, logLevel: 'error' });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const failures = [];

try {
  const offlineContext = await browser.createBrowserContext();
  const page = await offlineContext.newPage();
  const cdp = await page.createCDPSession();
  await cdp.send('Network.enable');
  page.on('pageerror', (error) => failures.push(error.message));
  console.log('checking online startup and precache…');
  await page.goto('http://127.0.0.1:4174/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('canvas', { timeout: 30000 });
  await page.evaluate(() => Promise.race([navigator.serviceWorker.ready, new Promise((_, reject) => setTimeout(() => reject(new Error('service worker did not become ready')), 15000))]));
  const cacheInfo = await page.evaluate(async () => {
    const cache = await caches.open('grocery-v2');
    const manifest = await cache.match('./precache-manifest.json');
    const files = manifest ? await manifest.json() : [];
    const missing = await Promise.all(files.map(async (file) => (await cache.match(file)) ? null : file));
    return { count: (await cache.keys()).length, missing: missing.filter(Boolean) };
  });
  if (!cacheInfo.count || cacheInfo.missing.length) throw new Error(`precache incomplete: ${JSON.stringify(cacheInfo)}`);

  await cdp.send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 });
  console.log('checking offline reload…');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('canvas', { timeout: 15000 });
  const loadedOffline = await page.evaluate(() => !!document.querySelector('canvas') && !document.querySelector('.loading'));
  if (!loadedOffline) throw new Error('game did not load offline');
  await offlineContext.close();
  console.log(`ok   production precache (${cacheInfo.count} entries) and offline reload`);

  const retryContext = await browser.createBrowserContext();
  const retryPage = await retryContext.newPage();
  const retryCdp = await retryPage.createCDPSession();
  await retryCdp.send('Network.enable');
  await retryCdp.send('Network.setBypassServiceWorker', { bypass: true });
  let failOnce = true;
  await retryPage.setRequestInterception(true);
  retryPage.on('request', (request) => {
    if (failOnce && request.url().includes('/assets/atlas.png')) {
      failOnce = false;
      void request.abort('failed');
    } else void request.continue();
  });
  await retryPage.goto('http://127.0.0.1:4174/', { waitUntil: 'domcontentloaded' });
  await retryPage.waitForSelector('.loading ~ .btn', { timeout: 15000 });
  const retryText = await retryPage.$eval('.loading', (el) => el.textContent);
  if (!retryText?.includes('could not be loaded')) throw new Error('asset failure message was not shown');
  await retryPage.evaluate(() => document.querySelector('.loading ~ .btn')?.click());
  await retryPage.waitForSelector('canvas', { timeout: 30000 });
  if (failOnce) throw new Error('the simulated asset failure did not occur');
  await retryContext.close();
  console.log('ok   failed startup shows retry and retry loads the game');
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
} finally {
  await browser.close();
  await server.close();
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('offline browser checks passed');
