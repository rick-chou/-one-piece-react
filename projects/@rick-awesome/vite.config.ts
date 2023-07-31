import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import vue3 from '@vitejs/plugin-vue';
import vue2 from '@vitejs/plugin-vue2';
import path from 'path';
import rehypeHighlight from 'rehype-highlight';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vueCompiler2 from 'vueCompiler2';
import vueCompiler3 from 'vueCompiler3';
import { description, name } from './package.json';
import mdxInjectImport from './src/blog/plugins/inject-import';

const baseUrl = '/react-awesome/';

export default defineConfig({
  base: baseUrl,
  envPrefix: 'RICK_',
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    target: 'ESNext',
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash'],
          echarts: ['echarts'],
          antd: ['antd'],
          vue: ['vue'],
          react: ['react'],
          prettier: ['prettier'],
          chance: ['chance'],
        },
      },
    },
  },

  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    vue2({ compiler: vueCompiler2 as any, include: 'src/**/*.v2.vue' }),
    vue3({ compiler: vueCompiler3, include: 'src/**/*.v3.vue' }),
    visualizer({
      template: 'treemap', // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/analyse.html', // will be saved in project's root
    }),
    mdx({
      jsxImportSource: '@emotion/react',
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        remarkMdxFrontmatter,
        mdxInjectImport,
      ],
      rehypePlugins: [rehypeHighlight, rehypeMdxCodeProps],
    }),
    VitePWA({
      injectRegister: 'auto',
      workbox: {
        maximumFileSizeToCacheInBytes: 500 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,ico,png,jpg,jpeg,svg,mp3}'],
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      useCredentials: true,
      includeAssets: ['public/*'],
      manifest: {
        name: name,
        start_url: `${baseUrl}?mode=pwa`,
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
      '@': path.resolve(__dirname, './src'),
      '@rick-flow': path.resolve(__dirname, './src/project/flowcharts'),
      '@rick-img-transform': path.resolve(
        __dirname,
        './src/project/img-transform',
      ),
    },
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    // global: {},
  },
});
