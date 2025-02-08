import {
  Editor as _Editor,
  type EditorProps as _EditorProps,
  type Monaco,
  useMonaco,
} from '@monaco-editor/react';
import { memoSVC } from '@rickzhou/react-utils';
import { type editor, type IDisposable, languages } from 'monaco-editor';
import { useEffect, useMemo, useRef } from 'react';
import { useTheme } from '../../ThemeProvider/useTheme';
import { EDITOR_OPTIONS } from '../common/config';
import '../common/setup';
import { Loading } from './Loading';

type MakeKeysOptional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

type EditorProps = Omit<_EditorProps, 'theme'> & {
  variableAutocompleteConfig?: Array<
    MakeKeysOptional<languages.CompletionItem, 'kind' | 'range'>
  >;
  readOnly?: boolean;
  language: string;
};

const Editor = memoSVC<EditorProps>(
  ({
    variableAutocompleteConfig = [],
    readOnly = false,
    language,
    ...props
  }) => {
    const monaco = useMonaco();
    const { theme } = useTheme();
    const editorRef = useRef<editor.IStandaloneCodeEditor>();
    const completionItemProvider = useRef<IDisposable>();

    function handleEditorDidMount(
      editor: editor.IStandaloneCodeEditor,
      monaco: Monaco,
    ) {
      editorRef.current = editor;
      props?.onMount?.(editor, monaco);
      monaco.editor.setTheme(theme);
    }

    useEffect(() => {
      if (monaco) {
        monaco.editor.setTheme(theme);
      }
    }, [monaco, theme]);

    useEffect(() => {
      if (monaco && variableAutocompleteConfig.length) {
        completionItemProvider.current?.dispose?.();
        completionItemProvider.current =
          monaco.languages.registerCompletionItemProvider(language, {
            triggerCharacters: ['$'],
            provideCompletionItems: (model, position) => {
              if (
                model.uri.toString() ===
                editorRef.current?.getModel()?.uri.toString()
              ) {
                const word = model.getWordUntilPosition(position);
                const range = {
                  startLineNumber: position.lineNumber,
                  endLineNumber: position.lineNumber,
                  startColumn: word.startColumn,
                  endColumn: word.endColumn,
                };
                const suggestions = variableAutocompleteConfig.map(i => {
                  return {
                    kind: languages.CompletionItemKind.Variable,
                    ...i,
                    range,
                  };
                });
                return {
                  suggestions,
                };
              }
            },
          });
      }
    }, [language, monaco, variableAutocompleteConfig]);

    const options = useMemo(() => {
      return {
        ...EDITOR_OPTIONS,
        ...props?.options,
        readOnly,
      };
    }, [props?.options, readOnly]);

    return (
      <_Editor
        loading={<Loading />}
        {...props}
        language={language}
        options={options}
        onMount={handleEditorDidMount}
      />
    );
  },
);

export default Editor;
