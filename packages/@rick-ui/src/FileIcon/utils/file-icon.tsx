import * as Icons from '../index';
import { FileType, getFileType } from './file-type';

const fileIconEnum = {
  [FileType.File]: <Icons.FileIcon />,
  [FileType.JS]: <Icons.JavascriptIcon />,
  [FileType.TS]: <Icons.TypeScriptDefIcon />,
  [FileType.TS_DEF]: <Icons.TypeScriptDefIcon />,
  [FileType.React]: <Icons.ReactIcon />,
  [FileType.React_TS]: <Icons.ReactTsIcon />,
  [FileType.JSON]: <Icons.JsonIcon />,
  [FileType.HTML]: <Icons.HtmlIcon />,
  [FileType.README]: <Icons.ReadmeIcon />,
  [FileType.MD]: <Icons.MarkdownIcon />,
  [FileType.IMG]: <Icons.ImageIcon />,
  [FileType.LOG]: <Icons.LogIcon />,
  [FileType.ZIP]: <Icons.ZipIcon />,
  [FileType.PDF]: <Icons.PdfIcon />,
  [FileType.SVG]: <Icons.SvgIcon />,
  [FileType.YARN]: <Icons.YarnIcon />,
  [FileType.CSS]: <Icons.CssIcon />,
  [FileType.SCSS]: <Icons.ScssIcon />,
  [FileType.LESS]: <Icons.LessIcon />,
  [FileType.STYLUS]: <Icons.StylusIcon />,
  [FileType.JEST]: <Icons.JestIcon />,
  [FileType.BABEL]: <Icons.BabelIcon />,
  [FileType.ESLINT]: <Icons.EslintIcon />,
  [FileType.VITE]: <Icons.ViteIcon />,
};

export const getFileIcon = (
  fileName: string,
  isDir: boolean,
  isExpanded: boolean,
) => {
  if (isDir) {
    if (fileName.toLowerCase() === 'components') {
      return <Icons.FolderComponentsIcon />;
    }

    return isExpanded ? <Icons.FolderOpenIcon /> : <Icons.FolderCloseIcon />;
  }

  return fileIconEnum[getFileType(fileName)];
};
