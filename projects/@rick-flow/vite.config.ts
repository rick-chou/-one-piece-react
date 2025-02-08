import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { description, name } from './package.json';

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_BASE_URL } = env;
  return {
    base: VITE_BASE_URL,
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      tailwindcss(),
      VitePWA({
        disable: true,
        injectRegister: 'auto',
        workbox: {
          maximumFileSizeToCacheInBytes: 500 * 1024 * 1024,
          globPatterns: ['**/*.{html,js,css,ico,png,svg}'],
        },
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        useCredentials: true,
        includeAssets: ['public/*'],
        manifest: {
          name: name,
          start_url: `${VITE_BASE_URL}?mode=pwa`,
          short_name: name,
          description,
          theme_color: '#ffffff',
          icons: [
            {
              src: 'icon-64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: 'icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'icon.png',
              sizes: '1280x1280',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@root': path.resolve(__dirname, '../../'),
        '@rickzhou/react-flow': path.resolve(
          __dirname,
          '../../projects/@rick-flow/src',
        ),
      },
    },
  };
});
