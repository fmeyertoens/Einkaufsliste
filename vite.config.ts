import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import vueDevTools from 'vite-plugin-vue-devtools';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';
import { workboxOptions } from './workbox.config';

export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    vueDevTools(),
    VitePWA({
      filename: 'service-worker.js',
      registerType: 'autoUpdate',
      injectRegister: null,
      manifest: {
        short_name: 'Einkaufsliste',
        name: 'Einkaufsliste',
        description: 'Eine einfache Einkaufsliste',
        lang: 'de',
        theme_color: '#3f51b5',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'img/icons/cart-192x192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'img/icons/cart-512x512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
      workbox: workboxOptions,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
});
