import { useBoolean, useMount } from 'ahooks';
import * as monaco from 'monaco-editor';
import { Uri, editor, languages } from 'monaco-editor';
import { useTabs } from './useTabs';

import CompilerWorker from '@rickzhou/react-repl/worker/compiler.worker?worker';
import FormatterWorker from '@rickzhou/react-repl/worker/formatter.worker?worker';
import LinterWorker from '@rickzhou/react-repl/worker/linter.worker?worker';

import TailwindcssWorker from '@rickzhou/react-repl/worker/tailwindcss.worker?worker';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

import {
  configureMonacoTailwindcss,
  tailwindcssData,
} from 'monaco-tailwindcss';

window.Monaco = monaco;

monaco.languages.css.cssDefaults.setOptions({
  data: {
    dataProviders: {
      tailwindcssData,
    },
  },
});

configureMonacoTailwindcss(monaco);

self.MonacoEnvironment = {
  getWorker(_, label) {
    switch (label) {
      case 'json':
        return new JsonWorker();
      case 'css':
      case 'scss':
      case 'less':
        return new CssWorker();
      case 'html':
        return new HtmlWorker();
      case 'typescript':
      case 'javascript':
        return new TsWorker();
      case 'tailwindcss':
        return new TailwindcssWorker();
      default:
        return new EditorWorker();
    }
  },
};

const compilerOptions: languages.typescript.CompilerOptions = {
  strict: true,
  target: languages.typescript.ScriptTarget.ESNext,
  module: languages.typescript.ModuleKind.ESNext,
  moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
  jsx: languages.typescript.JsxEmit.Preserve,
  allowNonTsExtensions: true,
};

languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions);
languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions);

const compiler = new CompilerWorker();
const formatter = new FormatterWorker();
const linter = new LinterWorker();

export const useInit = () => {
  const { tabs, setTabs } = useTabs();

  const [loading, { setFalse }] = useBoolean(true);

  const initModels = () => {
    const _tabs = [...tabs];
    _tabs.forEach(i => {
      if (!editor.getModel(Uri.parse(i.path))) {
        const model = editor.createModel(
          i.content,
          undefined,
          Uri.parse(i.path),
        );

        model.onDidChangeContent(() => {
          i.content = model.getValue();
          compiler.postMessage(_tabs);
          setTabs(_tabs);
        });
      }
    });

    compiler.postMessage(_tabs);
  };

  const initExtraLibs = () => {
    /**
     * Inject Syntax Hints
     * @api languages.typescript.javascriptDefaults.addExtraLib
     * @api languages.typescript.javascriptDefaults.getExtraLibs
     */

    /**
     * 似乎升级 Vite 后 {react,react-dom} 写法好像失效了
     * @link https://cn.vite.dev/guide/features#multiple-patterns
     */
    const types: Record<string, string> = import.meta.glob(
      [
        '../../../../node_modules/react/*.{d.ts,json}',
        '../../../../node_modules/react/**/*.{d.ts,json}',
        '../../../../node_modules/react-dom/*.{d.ts,json}',
        '../../../../node_modules/react-dom/**/*.{d.ts,json}',
        '../../../../node_modules/antd/*.{d.ts,json}',
        '../../../../node_modules/antd/**/*.{d.ts,json}',
        '../../../../node_modules/@types/react/*.{d.ts,json}',
        '../../../../node_modules/@types/react/**/*.{d.ts,json}',
        '../../../../node_modules/@types/react-dom/*.{d.ts,json}',
        '../../../../node_modules/@types/react-dom/**/*.{d.ts,json}',
      ],
      { eager: true, query: 'raw', import: 'default' },
    );

    Object.keys(types).forEach(path => {
      const __path__ = path.substring(11); // remove node_module prefix
      languages.typescript.typescriptDefaults.addExtraLib(
        types[path],
        `file://${__path__}`,
      );
      languages.typescript.javascriptDefaults.addExtraLib(
        types[path],
        `file://${__path__}`,
      );
    });
  };

  useMount(() => {
    initModels();
    initExtraLibs();
    setFalse();
  });

  return {
    loading,
    compiler,
    formatter,
    linter,
  };
};
