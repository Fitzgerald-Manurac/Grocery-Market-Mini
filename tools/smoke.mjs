// Browser smoke checks for the Grocery game on desktop and phone-sized screens.
import { existsSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'vite';
import puppeteer from 'puppeteer-core';

const CHROME = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
].find((path) => path && existsSync(path));
if (!CHROME) throw new Error('Chrome not found; set CHROME_PATH.');

const server = await createServer({ server: { port: 5198, strictPort: true }, logLevel: 'error' });
await server.listen();
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const failures = [];
const savePath = join(tmpdir(), `grocery-smoke-${process.pid}.txt`);
try {
  for (const viewport of [
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'phone', width: 390, height: 760, isMobile: true, hasTouch: true },
  ]) {
    const page = await browser.newPage();
    await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
    page.on('pageerror', (error) => failures.push(`${viewport.name}: ${error.message}`));
    page.on('console', (message) => {
      // Optional remote analytics is blocked in some test environments.
      if (message.type() === 'error' && !message.text().includes('net::ERR_NETWORK_ACCESS_DENIED')) failures.push(`${viewport.name}: ${message.text()}`);
    });
    await page.goto('http://localhost:5198/', { waitUntil: 'networkidle0' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForSelector('canvas', { timeout: 30000 });
    const loaded = await page.evaluate(() => !!window.game && !!document.querySelector('canvas'));
    if (!loaded) throw new Error(`${viewport.name}: game did not initialize`);
    const click = (selector) => page.evaluate((sel) => document.querySelector(sel)?.click(), selector);
    const menuTitle = await page.$eval('.title-screen-modal .modal-head h2', (el) => el.textContent);
    if (menuTitle !== 'Grocery Market Mini Game') throw new Error(`${viewport.name}: title screen heading is wrong`);
    for (const name of ['New Game', 'Load Game', 'Option', 'Exit']) {
      const exists = await page.$(`.title-screen-action[aria-label="${name === 'New Game' ? 'Start a new game' : name === 'Load Game' ? 'Load saved game' : name === 'Option' ? 'Open options' : 'Exit game'}"]`);
      if (!exists) throw new Error(`${viewport.name}: missing ${name} button`);
    }

    await click('.title-screen-back');
    if (!(await page.$('.title-screen-modal'))) throw new Error(`${viewport.name}: clicking outside dismissed the title screen`);
    await click('[aria-label="Load saved game"]');
    const loadTitle = await page.$eval('.modal-head h2', (el) => el.textContent);
    if (loadTitle !== 'Load Game' || !(await page.$('.title-slot-manager'))) throw new Error(`${viewport.name}: Load Game did not show save slots`);
    const expectedSave = await page.evaluate(() => JSON.parse(localStorage.getItem('grocery.save.v1')));
    await page.evaluate(() => { window.game.state.money = -123; });
    await click('.title-slot-row .btn.primary');
    const loadedSave = await page.evaluate((expected) => window.game.state.money === expected.money
      && window.game.state.day === expected.day && !window.game.nightPaused
      && !document.querySelector('.title-screen-modal'), expectedSave);
    if (!loadedSave) throw new Error(`${viewport.name}: Load Game did not restore the browser save`);

    await page.evaluate(() => window.game.ui.showTitleScreen());
    await click('[aria-label="Load saved game"]');
    await page.$eval('.title-slot-row.empty input', (el) => { el.value = 'Corner Store'; });
    await click('.title-slot-row.empty .btn');
    const slotSaved = await page.$eval('.title-slot-row:nth-child(2) .title-slot-info small', (el) => !el.textContent.includes('Empty slot'));
    if (!slotSaved) throw new Error(`${viewport.name}: saving to a manual slot failed`);
    let slotRecord = await page.evaluate(() => JSON.parse(localStorage.getItem('grocery.save.slots.v1'))[0]);
    if (slotRecord.name !== 'Corner Store') throw new Error(`${viewport.name}: save slot name was not saved`);
    await page.$eval('.title-slot-row:nth-child(2) input', (el) => { el.value = 'Friday Market'; });
    await page.evaluate(() => [...document.querySelectorAll('.title-slot-row:nth-child(2) .btn')][2].click());
    slotRecord = await page.evaluate(() => JSON.parse(localStorage.getItem('grocery.save.slots.v1'))[0]);
    if (slotRecord.name !== 'Friday Market') throw new Error(`${viewport.name}: save slot rename failed`);
    const manualSave = slotRecord.state;
    await page.evaluate(() => { window.game.state.money = -456; });
    await click('.title-slot-row:nth-child(2) .btn.primary');
    const manualLoaded = await page.evaluate((expected) => window.game.state.money === expected.money
      && window.game.state.day === expected.day && !document.querySelector('.title-screen-modal'), manualSave);
    if (!manualLoaded) throw new Error(`${viewport.name}: loading a manual slot failed`);

    await page.evaluate(() => window.game.ui.showTitleScreen());
    await click('[aria-label="Open options"]');
    const optionsOpen = await page.$eval('.modal-head h2', (el) => el.textContent === 'Option');
    if (!optionsOpen) throw new Error(`${viewport.name}: Option did not open settings`);
    await click('.title-screen-back .modal-head .btn');
    if (!(await page.$('.title-screen-modal')) || !(await page.evaluate(() => window.game.paused()))) throw new Error(`${viewport.name}: title Options X did not return to title`);

    await click('[aria-label="Start a new game"]');
    if (!(await page.$('.modal .btn.warn'))) throw new Error(`${viewport.name}: New Game did not ask for confirmation`);
    await click('.title-screen-back');
    if (!(await page.$('.title-screen-modal'))) throw new Error(`${viewport.name}: clicking outside dismissed New Game confirmation`);
    await click('.modal .btn.warn');
    const started = await page.evaluate(() => window.game.phase === 'day' && !document.querySelector('.title-screen-modal'));
    if (!started) throw new Error(`${viewport.name}: New Game did not start the day`);

    await page.evaluate(() => window.game.ui.showTitleScreen());
    const pausedBehindTitle = await page.evaluate(() => window.game.paused());
    await click('.title-screen-back');
    const stillPausedBehindTitle = await page.evaluate(() => window.game.paused() && !!document.querySelector('.title-screen-modal'));
    if (!pausedBehindTitle || !stillPausedBehindTitle) throw new Error(`${viewport.name}: gameplay was not held while title screen was open`);

    await page.evaluate(() => window.game.ui.showMenu());
    const menuX = await page.$('.pause-menu-back .modal-head .btn');
    if (!menuX) throw new Error(`${viewport.name}: in-game options X is missing`);
    await menuX.click();
    if (await page.$('.pause-menu-back') || await page.evaluate(() => window.game.paused())) throw new Error(`${viewport.name}: in-game options X did not resume gameplay`);
    await page.evaluate(() => window.game.ui.showMenu());
    await click('.menu-navigation .btn:not(.warn)');
    if (!(await page.$('.title-slot-manager')) || !(await page.$('input.title-save-file'))) throw new Error(`${viewport.name}: Save Games did not open save manager/file picker`);
    await click('.title-load-modal .modal-foot .btn.ghost');
    if (!(await page.$('.pause-menu-back'))) throw new Error(`${viewport.name}: Save Games Back did not return to game menu`);
    await page.evaluate(() => window.game.ui.showMenu());
    await click('.menu-navigation .btn:not(.warn)');
    if (!(await page.$('.title-slot-manager'))) throw new Error(`${viewport.name}: Save Games did not open from menu`);
    await click('.modal-foot .btn.ghost');
    if (!(await page.$('.pause-menu-back'))) throw new Error(`${viewport.name}: Save Games did not return to menu`);
    await click('.menu-navigation .btn:nth-child(2)');
    if (!(await page.$('.title-screen-modal'))) throw new Error(`${viewport.name}: Back to Opening Game failed`);
    await page.evaluate(() => window.game.ui.showMenu());
    await click('.menu-navigation .btn.warn');
    if (!(await page.$('.modal-head h2')) || !(await page.$('.title-screen-back'))) throw new Error(`${viewport.name}: Exit Game prompt did not open`);
    await click('.modal-foot .btn.primary');
    if (!(await page.$('.pause-menu-back'))) throw new Error(`${viewport.name}: exit prompt did not return to menu`);
    await page.click('.pause-menu-back .modal-head .btn');
    if ((await page.$('.pause-menu-back')) || await page.evaluate(() => window.game.paused())) throw new Error(`${viewport.name}: menu X did not resume gameplay`);

    await page.evaluate(() => window.game.ui.showTitleScreen());
    await click('[aria-label="Load saved game"]');
    const exportedSave = await page.evaluate(async () => {
      const { encodeSave } = await import('/src/game/savecode.ts');
      const snapshot = structuredClone(window.game.state);
      snapshot.day = 77;
      return encodeSave(snapshot);
    });
    writeFileSync(savePath, exportedSave, 'utf8');
    const fileInput = await page.$('input.title-save-file');
    if (!fileInput) throw new Error(`${viewport.name}: Open Save File input is missing`);
    await fileInput.uploadFile(savePath);
    await page.waitForFunction(() => window.game.state.day === 77 && !document.querySelector('.title-slot-manager'), { timeout: 10000 });

    if (!viewport.isMobile) {
      await page.evaluate(() => window.debug.checkout());
      await page.waitForSelector('.mini', { timeout: 5000 });
      await page.keyboard.press('Escape');
      await page.waitForSelector('.mini', { hidden: true, timeout: 5000 });
    }
    await page.evaluate(() => window.game.ui.showTitleScreen());
    await click('[aria-label="Exit game"]');
    if (!(await page.isClosed())) {
      await page.waitForFunction(() => [...document.querySelectorAll('.modal-head h2')].some((el) => el.textContent === 'Exit Game'));
      await click('.modal-foot .btn.primary');
      if (!(await page.$('.title-screen-modal'))) throw new Error(`${viewport.name}: Exit Back did not return to title`);
    }
    console.log(`ok   ${viewport.name}: title menu buttons${viewport.isMobile ? '' : ' and mini-game'} work`);
    await page.close();
  }
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
} finally {
  await browser.close();
  await server.close();
  if (existsSync(savePath)) unlinkSync(savePath);
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('smoke checks passed');
