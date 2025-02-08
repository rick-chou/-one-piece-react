import { memoSVC } from '@rickzhou/react-utils';
import { Modal } from 'antd';
import { first, last, toLower } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { Hotkey } from '../../config/hotkey';
import {
  CommandItemStyle,
  CommandItemTitleStyle,
  CommandListStyle,
  CommandModalContainer,
  CommandModalInputDividerStyle,
  CommandModalInputDividerWrapperStyle,
  CommandModalInputStyle,
} from './style';
import { useCommandsDialogVisible } from './useCommandsDialogVisible';

export type CommandItemType = {
  type: string;
  mode: 'item' | 'title';
  title: string;
  children?: CommandItemType[];
  onClick?: (command: CommandItemType) => void;
};

const commandItemCls = 'command-item';
const commandHoverCls = 'command-hover';

type CommandsDialogProps = {
  open: boolean;
  commands: CommandItemType[];
};

const CommandsDialog = memoSVC<CommandsDialogProps>(({ commands = [] }) => {
  const { open, toggle } = useCommandsDialogVisible();
  const commandInputRef = useRef<HTMLInputElement>(null);
  const [displayCommandItems, setDisplayCommandItems] = useState(commands);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ([Hotkey.ArrowUp, Hotkey.ArrowDown, Hotkey.Enter].includes(e.key)) {
        const item = document.querySelector<HTMLDivElement>(
          `.${commandItemCls}[data-type=item].${commandHoverCls}`,
        );
        const items = document.querySelectorAll<HTMLDivElement>(
          `.${commandItemCls}[data-type=item]`,
        );
        let target: HTMLDivElement;
        if (item) {
          if (e.key === Hotkey.Enter) {
            item.click();
            return;
          }
          const idx = Array.from(items).findIndex(i =>
            i.classList.contains(commandHoverCls),
          );
          if (e.key === Hotkey.ArrowUp && idx !== 0) {
            item?.classList.remove(commandHoverCls);
            target = items[idx - 1];
          }
          if (e.key === Hotkey.ArrowDown && idx !== items.length - 1) {
            item?.classList.remove(commandHoverCls);
            target = items[idx + 1];
          }
        } else {
          target = e.key === Hotkey.ArrowDown ? first(items)! : last(items)!;
        }

        if (target!) {
          target.classList.add(commandHoverCls);
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    };

    if (open) {
      window.addEventListener('keydown', fn);
    } else {
      window.removeEventListener('keydown', fn);
    }

    return () => {
      window.removeEventListener('keydown', fn);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        commandInputRef.current?.focus();
      }, 300);
    }
  }, [open]);

  return (
    <Modal
      title={null}
      footer={null}
      open={open}
      styles={{ body: { padding: 0 } }}
      closable={false}
      maskClosable
      mask={false}
      centered
      onCancel={() => {
        toggle(false);
        setDisplayCommandItems(commands);
        setSearchVal('');
      }}>
      <div css={CommandModalContainer}>
        <input
          value={searchVal}
          placeholder="Type a command or search…"
          css={CommandModalInputStyle}
          ref={commandInputRef}
          onChange={e => {
            const result = commands.filter(i => {
              return (
                toLower(i.title).includes(toLower(e.target.value)) ||
                (i.mode === 'title' &&
                  commands.some(
                    j =>
                      i.type === j.type &&
                      toLower(j.title).includes(toLower(e.target.value)),
                  ))
              );
            });

            if (result.some(i => i.mode === 'item')) {
              setSearchVal(e.target.value);
              setDisplayCommandItems(result);
            }
          }}
        />

        <div css={CommandModalInputDividerWrapperStyle}>
          <hr css={CommandModalInputDividerStyle} />
        </div>

        <div
          css={CommandListStyle}
          onMouseMove={e => {
            const target = e.target as HTMLDivElement;
            if (target.dataset.type === 'item') {
              target.parentNode?.childNodes.forEach(i => {
                (i as HTMLDivElement).classList.remove(commandHoverCls);
              });
              target.classList.add(commandHoverCls);
            }
          }}>
          {displayCommandItems.map(item => {
            return (
              <div
                key={item.title}
                data-type={item.mode}
                className={commandItemCls}
                css={
                  item.mode === 'title'
                    ? CommandItemTitleStyle
                    : CommandItemStyle
                }
                onClick={() => {
                  item?.onClick?.(item);
                }}>
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
});

export default CommandsDialog;
