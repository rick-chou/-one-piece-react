export enum FileType {
  'File',
  'JS',
  'TS',
  'TS_DEF',
  'React_TS',
  'React',
  'JSON',
  'HTML',
  'README',
  'MD',
  'IMG',
  'LOG',
  'ZIP',
  'PDF',
  'SVG',
  'YARN',
  'CSS',
  'LESS',
  'STYLUS',
  'SCSS',
  'JEST',
  'BABEL',
  'ESLINT',
  'VITE',
}

export const getFileType = (fileName: string) => {
  /**
   * parseConfigFile
   */
  if (fileName.includes('eslint')) {
    return FileType.ESLINT;
  }

  if (fileName.includes('vite')) {
    return FileType.VITE;
  }

  if (fileName.includes('babel')) {
    return FileType.BABEL;
  }

  if (fileName.includes('jest')) {
    return FileType.JEST;
  }

  /**
   * parseCssFile
   */
  if (/\.s[a|c]ss$/.test(fileName)) {
    return FileType.SCSS;
  }

  if (fileName.endsWith('.css')) {
    return FileType.CSS;
  }

  if (fileName.endsWith('.less')) {
    return FileType.LESS;
  }

  if (fileName.endsWith('.styl')) {
    return FileType.STYLUS;
  }

  /**
   * parseHtmlFile
   */
  if (/\.html?$/.test(fileName)) {
    return FileType.HTML;
  }

  /**
   * parseJsTsFile
   */
  if (/\.[m|c]?jsx?$/.test(fileName)) {
    return FileType.JS;
  }

  if (fileName.endsWith('.d.ts')) {
    return FileType.TS_DEF;
  }

  if (fileName.endsWith('.ts')) {
    return FileType.TS;
  }

  /**
   * parseYarnFile
   */

  if (fileName === 'yarn.lock') {
    return FileType.YARN;
  }

  /**
   * parseReactFile
   */
  if (fileName.endsWith('.jsx')) {
    return FileType.React;
  }

  if (fileName.endsWith('.tsx')) {
    return FileType.React_TS;
  }

  /**
   * parseJsonFile
   */
  if (fileName.endsWith('.json')) {
    return FileType.JSON;
  }

  /**
   * parseImgFile
   */
  if (/\.[png|gif|jpg|webp]$/.test(fileName)) {
    return FileType.IMG;
  }

  if (fileName.endsWith('.svg')) {
    return FileType.SVG;
  }

  /**
   * parseMarkdownFile
   */
  if (fileName === 'README.md') {
    return FileType.README;
  }

  if (fileName.endsWith('.md')) {
    return FileType.MD;
  }

  /**
   * parseAssetsFile
   */
  if (fileName.endsWith('.zip')) {
    return FileType.ZIP;
  }

  if (fileName.endsWith('.pdf')) {
    return FileType.PDF;
  }

  if (fileName.endsWith('.log')) {
    return FileType.LOG;
  }

  return FileType.File;
};
