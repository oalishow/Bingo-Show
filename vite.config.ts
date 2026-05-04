import path from 'path';
import { defineConfig, loadEnv } from 'vite';


import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: process.env.DISABLE_HMR !== 'true'
      },
      plugins: [
        VitePWA({
          registerType: 'prompt',
          devOptions: {
            enabled: true,
            type: 'module',
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,json,tsx,ts}'],
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'google-fonts-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              },
              {
                urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'gstatic-fonts-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              },
              {
                urlPattern: /^https:\/\/cdn\.tailwindcss\.com\/.*/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'tailwind-cache',
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              },
              {
                urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'jsdelivr-cache',
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              }
            ]
          },
          includeAssets: ['favicon.ico', 'favicon.svg', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-512x512-maskable.png', 'icon.svg'],
          manifest: {
            name: 'Bingo Show',
            short_name: 'Bingo Show',
            description: 'Aplicativo de Bingo Show',
            theme_color: '#4f46e5',
            background_color: '#1e1b4b',
            display: 'standalone',
            start_url: '/',
            icons: [
              {
                src: 'pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png'
              },
              {
                src: 'pwa-512x512-maskable.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
              },
              {
                src: 'favicon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'any'
              }
            ],
            shortcuts: [
              {
                name: 'Iniciar Bingo',
                short_name: 'Bingo',
                description: 'Abrir painel de Bingo',
                url: '/',
                icons: [{ src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' }]
              }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
