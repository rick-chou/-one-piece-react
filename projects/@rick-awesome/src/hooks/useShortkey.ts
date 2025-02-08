import { Hotkey } from '@rickzhou/awesome/config/shortcut';
import { OpenTypeConfig } from '@rickzhou/awesome/store/slice/modalOpenSlice';
import { last, toUpper } from 'lodash-es';
import { useEffect } from 'react';
import { useModalOpen } from './useModalOpen';

export const useShortKey = () => {
  const { onToggle: onCmdToggle } = useModalOpen(OpenTypeConfig.CommandOpen);

  useEffect(() => {
    const shortcuts = {
      commandModalV1: {
        hotkey: [Hotkey.Meta, Hotkey.S],
        fn: onCmdToggle,
      },
      commandModalV2: {
        hotkey: [Hotkey.Meta, Hotkey.F],
        fn: onCmdToggle,
      },
    };

    const bindShortcut = (e: KeyboardEvent) => {
      if (
        (e.metaKey && toUpper(e.key) === Hotkey.S) ||
        (e.metaKey && toUpper(e.key) === Hotkey.F)
      ) {
        e.preventDefault();
      }

      Object.entries(shortcuts).forEach(([_, val]) => {
        if (val.hotkey.includes(Hotkey.Meta)) {
          if (toUpper(e.key) === toUpper(last(val.hotkey)) && e.metaKey) {
            val.fn();
          }
        }

        if (val.hotkey.includes(Hotkey.Ctrl)) {
          if (toUpper(e.key) === toUpper(last(val.hotkey)) && e.ctrlKey) {
            val.fn();
          }
        }
      });
    };

    window.addEventListener('keydown', bindShortcut);

    return () => {
      window.removeEventListener('keydown', bindShortcut);
    };
  }, [onCmdToggle]);
};
