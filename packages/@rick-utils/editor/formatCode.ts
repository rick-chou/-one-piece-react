import { type Options, type ParserOptions } from 'prettier';
import parseHtmlPlugin from 'prettier/parser-html';
import parseMdPlugin from 'prettier/parser-markdown';
import parserTypeScriptPlugin from 'prettier/parser-typescript';
import prettier from 'prettier/standalone';

const prettierConfig: Options = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  arrowParens: 'avoid',
  trailingComma: 'all',
  bracketSameLine: true,
  printWidth: 80,
  endOfLine: 'lf',
};

/**
 * @since 1.0.0
 */
export const formatCode = (
  content: string,
  parser: ParserOptions['parser'] = 'typescript',
) => {
  return prettier.format(content, {
    ...prettierConfig,
    parser,
    plugins: [parserTypeScriptPlugin, parseHtmlPlugin, parseMdPlugin],
  });
};
