import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { LanguageIdEnum } from 'monaco-sql-languages';

/** import contribution file */
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution.js';
import 'monaco-editor/esm/vs/language/json/monaco.contribution';
import 'monaco-sql-languages/esm/languages/mysql/mysql.contribution';

/** import worker files */
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import MySQLWorker from 'monaco-sql-languages/esm/languages/mysql/mysql.worker?worker';

import { Logger } from '@rickzhou/react-utils';
import { darkTheme } from '../themes/dark';
import { lightTheme } from '../themes/light';

const worker = new Worker('monaco-editor/esm/vs/editor/editor.worker');
console.log('worker', worker);
/** define MonacoEnvironment.getWorker  */
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === LanguageIdEnum.MYSQL) {
      return new MySQLWorker();
    }
    if (label.toLocaleUpperCase() === 'JSON') {
      return new JsonWorker();
    }
    return new EditorWorker();
  },
};

loader.config({ monaco });

loader.init().then(monaco => {
  /** define theme  */
  Logger.success('MONACO EDITOR THEME INIT');
  monaco.editor.defineTheme('dark', darkTheme);
  monaco.editor.defineTheme('light', lightTheme);
});

export { monaco };
