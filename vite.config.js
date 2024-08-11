import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,

      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
      },
      outDir: '../dist',
    },
    optimizeDeps: {
      exclude: ['axios'], // Виключення axios з обробки Vite
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
    // Додаємо налаштування для CommonJS
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  };
});
