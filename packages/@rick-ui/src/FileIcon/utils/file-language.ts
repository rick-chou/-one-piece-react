import { FileType, getFileType } from './file-type';

export type Language = 'css' | 'html' | 'json' | 'typescript' | '';

export const getFileLanguage = (fileName: string): Language => {
  const fileType = getFileType(fileName);
  switch (fileType) {
    case FileType.HTML:
      return 'html';
    case FileType.CSS:
    case FileType.SCSS:
    case FileType.LESS:
    case FileType.STYLUS:
      return 'css';
    case FileType.JS:
    case FileType.TS:
    case FileType.TS_DEF:
      return 'typescript';
    case FileType.JSON:
    case FileType.YARN:
      return 'json';
    default:
      return '';
  }
};
