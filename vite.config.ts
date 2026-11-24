import { defineConfig } from 'vite';

function offlinePrecache() {
  return {
    name: 'offline-precache-manifest',
    generateBundle(_options: unknown, bundle: Record<string, { type: string }>) {
      const files = ['./', './index.html', './precache-manifest.json', ...Object.keys(bundle).filter((file) => file !== 'sw.js').map((file) => `./${file}`)];
      this.emitFile({ type: 'asset', fileName: 'precache-manifest.json', source: JSON.stringify([...new Set(files)]) });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [offlinePrecache()],
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'app', test: /[\\/]src[\\/]/, minSize: 0, maxSize: 450_000 }],
        },
      },
    },
  },
  define: { __BUILD__: JSON.stringify(Date.now().toString(36)) },
});
