import {
  errorColor,
  processingColor,
  successColor,
  warningColor,
} from '@rickzhou/react-ui';

const CONSOLE_STYLE = [
  'color: #FFF',
  'font-size: 14px',
  'padding: 6px',
  'border-radius:4px',
];

export class Logger {
  static success(log: string) {
    console.log(
      `%c ✅ SUCCESS : ${log}`,
      [...CONSOLE_STYLE, `background: ${successColor}`].join(';'),
    );
  }
  static warning(log: string) {
    console.log(
      `%c ⚠️ WARNING : ${log}`,
      [...CONSOLE_STYLE, `background: ${warningColor}`].join(';'),
    );
  }
  static error(log: string) {
    console.log(
      `%c ❌ ERROR : ${log}`,
      [...CONSOLE_STYLE, `background: ${errorColor}`].join(';'),
    );
  }
  static processing(log: string) {
    console.log(
      `%c ⏳ PROCESSING : ${log}`,
      [...CONSOLE_STYLE, `background: ${processingColor}`].join(';'),
    );
  }
}
