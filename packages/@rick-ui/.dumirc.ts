import { defineConfig } from 'dumi';
// import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '@rickzhou/react-ui',
  },
  chainWebpack(memo, args) {
    // memo.plugin('node-polyfill').use(NodePolyfillPlugin).end();
    // console.log('memo', memo);
    return memo;
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'EN' },
  ],
});
