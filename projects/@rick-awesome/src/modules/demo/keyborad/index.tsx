/**
 * @author
 * @link https://codepen.io/jkantner/pen/ZEqKgWJ
 */

import { ThemeWrapper } from '@rickzhou/react-ui';
import { isMac } from '@rickzhou/awesome/utils';
import { useEffect } from 'react';
import { keyboardStyle } from './style';

const activeClass = 'active';

const Keyboard = () => {
  useEffect(() => {
    const el = document.querySelector<HTMLDivElement>('.keyboard')!;

    const toggleActive = (target: KeyboardEvent, key: string) => {
      const keyEl = el?.querySelector(`[data-key="${key}"]`);
      if (target.type === 'keydown') {
        keyEl?.classList.add(activeClass);
      } else {
        el?.querySelectorAll(`[data-key]`)?.forEach(i => {
          i.classList.remove(activeClass);
        });
      }
    };

    const keyAction = (target: KeyboardEvent) => {
      const { key } = target;

      const isCmd = key === 'Meta' && isMac();
      const isCtrl = key === 'Control' && !isMac();

      if (key === 'c' || key === 'v') {
        toggleActive(target, key);
      }

      if (isCmd || isCtrl) {
        toggleActive(target, 'cmd');
      }
    };

    window.addEventListener('keydown', keyAction);
    window.addEventListener('keyup', keyAction);

    return () => {
      window.removeEventListener('keydown', keyAction);
      window.removeEventListener('keyup', keyAction);
    };
  }, []);

  return (
    <ThemeWrapper style={keyboardStyle}>
      <div className="keyboard">
        <button
          className="keyboard__key keyboard__key--meta"
          type="button"
          data-key="cmd">
          <span className="keyboard__key-lines">
            <svg
              className="keyboard__cmd keyboard__key-line--tr"
              viewBox="0 0 16 16"
              width="16px"
              height="16px"
              aria-hidden="true">
              <path
                fill="none"
                stroke="currentcolor"
                strokeWidth={2}
                d="M5.7,10.3v2.3c0,1.3-1,2.3-2.3,2.3S1,14,1,12.7s1-2.3,2.3-2.3H5.7z M5.7,10.3h4.7 M5.7,10.3V5.7M10.3,10.3v2.3c0,1.3,1,2.3,2.3,2.3s2.3-1,2.3-2.3s-1-2.3-2.3-2.3H10.3z M10.3,10.3V5.7 M10.3,5.7H5.7 M10.3,5.7V3.3c0-1.3,1-2.3,2.3-2.3S15,2,15,3.3s-1,2.3-2.3,2.3H10.3z M5.7,5.7V3.3C5.7,2,4.6,1,3.3,1S1,2,1,3.3s1,2.3,2.3,2.3H5.7z"
              />
            </svg>
            <small className="keyboard__key-line keyboard__key-line--small keyboard__key-line--br">
              command
            </small>
          </span>
        </button>
        <button className="keyboard__key" type="button" data-key="c">
          <span className="keyboard__key-lines">
            <span className="keyboard__key-line">C</span>
          </span>
        </button>
        <button className="keyboard__key" type="button" data-key="v">
          <span className="keyboard__key-lines">
            <span className="keyboard__key-line">V</span>
          </span>
        </button>
      </div>
    </ThemeWrapper>
  );
};

export default Keyboard;
