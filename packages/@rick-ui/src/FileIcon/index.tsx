/**
 * @link https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=21124
 */

import Babel from './icon/babel.svg';
import BrowserList from './icon/browserList.svg';
import Changelog from './icon/changelog.svg';
import Css from './icon/css.svg';
import Eslint from './icon/eslint.svg';
import File from './icon/file.svg';
import FolderClose from './icon/folder-close.svg';
import FolderComponents from './icon/folder-components.svg';
import FolderOpen from './icon/folder-open.svg';
import Gulp from './icon/gulp.svg';
import Html from './icon/html.svg';
import Image from './icon/image.svg';
import Javascript from './icon/javascript.svg';
import Jest from './icon/jest.svg';
import Json from './icon/json.svg';
import Less from './icon/less.svg';
import Vite from './icon/lightning.svg';
import Lock from './icon/lock.svg';
import Log from './icon/log.svg';
import Markdown from './icon/markdown.svg';
import Pdf from './icon/pdf.svg';
import Postcss from './icon/postcss.svg';
import React from './icon/react.svg';
import ReactTs from './icon/react_ts.svg';
import Readme from './icon/readme.svg';
import { default as Sass, default as Scss } from './icon/sass.svg';
import Stylus from './icon/stylus.svg';
import Svg from './icon/svg.svg';
import Tailwindcss from './icon/tailwindcss.svg';
import TestJs from './icon/test-js.svg';
import TestTs from './icon/test-ts.svg';
import TypeScriptDef from './icon/typescript-def.svg';
import Typescript from './icon/typescript.svg';
import Video from './icon/video.svg';
import Xml from './icon/xml.svg';
import Yarn from './icon/yarn.svg';
import Zip from './icon/zip.svg';

type IconProps = {
  style?: React.CSSProperties;
};

const Icon: React.FC<{ path: string } & IconProps> = ({ path, style }) => {
  return <img src={path} className="h-4 w-4" style={style} />;
};

export const BabelIcon: React.FC<IconProps> = props => (
  <Icon path={Babel} {...props} />
);
export const FileIcon: React.FC<IconProps> = props => (
  <Icon path={File} {...props} />
);
export const FolderOpenIcon: React.FC<IconProps> = props => (
  <Icon path={FolderOpen} {...props} />
);
export const FolderCloseIcon: React.FC<IconProps> = props => (
  <Icon path={FolderClose} {...props} />
);
export const FolderComponentsIcon: React.FC<IconProps> = props => (
  <Icon path={FolderComponents} {...props} />
);
export const HtmlIcon: React.FC<IconProps> = props => (
  <Icon path={Html} {...props} />
);
export const JavascriptIcon: React.FC<IconProps> = props => (
  <Icon path={Javascript} {...props} />
);
export const JsonIcon: React.FC<IconProps> = props => (
  <Icon path={Json} {...props} />
);
export const LogIcon: React.FC<IconProps> = props => (
  <Icon path={Log} {...props} />
);
export const ReactTsIcon: React.FC<IconProps> = props => (
  <Icon path={ReactTs} {...props} />
);
export const ReactIcon: React.FC<IconProps> = props => (
  <Icon path={React} {...props} />
);
export const SassIcon: React.FC<IconProps> = props => (
  <Icon path={Sass} {...props} />
);
export const StylusIcon: React.FC<IconProps> = props => (
  <Icon path={Stylus} {...props} />
);
export const TypescriptIcon: React.FC<IconProps> = props => (
  <Icon path={Typescript} {...props} />
);
export const VideoIcon: React.FC<IconProps> = props => (
  <Icon path={Video} {...props} />
);
export const XmlIcon: React.FC<IconProps> = props => (
  <Icon path={Xml} {...props} />
);
export const YarnIcon: React.FC<IconProps> = props => (
  <Icon path={Yarn} {...props} />
);
export const ZipIcon: React.FC<IconProps> = props => (
  <Icon path={Zip} {...props} />
);
export const PdfIcon: React.FC<IconProps> = props => (
  <Icon path={Pdf} {...props} />
);
export const TestJsIcon: React.FC<IconProps> = props => (
  <Icon path={TestJs} {...props} />
);
export const TestTsIcon: React.FC<IconProps> = props => (
  <Icon path={TestTs} {...props} />
);
export const TailwindcssIcon: React.FC<IconProps> = props => (
  <Icon path={Tailwindcss} {...props} />
);
export const PostcssIcon: React.FC<IconProps> = props => (
  <Icon path={Postcss} {...props} />
);
export const MarkdownIcon: React.FC<IconProps> = props => (
  <Icon path={Markdown} {...props} />
);
export const ImageIcon: React.FC<IconProps> = props => (
  <Icon path={Image} {...props} />
);
export const EslintIcon: React.FC<IconProps> = props => (
  <Icon path={Eslint} {...props} />
);
export const GulpIcon: React.FC<IconProps> = props => (
  <Icon path={Gulp} {...props} />
);
export const CssIcon: React.FC<IconProps> = props => (
  <Icon path={Css} {...props} />
);
export const BrowserListIcon: React.FC<IconProps> = props => (
  <Icon path={BrowserList} {...props} />
);
export const ChangelogIcon: React.FC<IconProps> = props => (
  <Icon path={Changelog} {...props} />
);
export const LessIcon: React.FC<IconProps> = props => (
  <Icon path={Less} {...props} />
);
export const JestIcon: React.FC<IconProps> = props => (
  <Icon path={Jest} {...props} />
);
export const ReadmeIcon: React.FC<IconProps> = props => (
  <Icon path={Readme} {...props} />
);
export const LockIcon: React.FC<IconProps> = props => (
  <Icon path={Lock} {...props} />
);
export const SvgIcon: React.FC<IconProps> = props => (
  <Icon path={Svg} {...props} />
);
export const TypeScriptDefIcon: React.FC<IconProps> = props => (
  <Icon path={TypeScriptDef} {...props} />
);
export const ScssIcon: React.FC<IconProps> = props => (
  <Icon path={Scss} {...props} />
);
export const ViteIcon: React.FC<IconProps> = props => (
  <Icon path={Vite} {...props} />
);
