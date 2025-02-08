import { Hotkey } from '@rickzhou/awesome/config/shortcut';
import { useModalOpen } from '@rickzhou/awesome/hooks/useModalOpen';
import { type ThemeMode } from '@rickzhou/awesome/interface';
import { BlogRoutes } from '@rickzhou/awesome/router/blog';
import { metaData, type MetaData } from '@rickzhou/awesome/router/meta-data';
import { OpenTypeConfig } from '@rickzhou/awesome/store/slice/modalOpenSlice';
import { fonts } from '@rickzhou/awesome/theme';
import { useTheme } from '@rickzhou/react-ui';
import { Modal } from 'antd';
import { first, last, lowerCase, toLower, upperCase } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandItemStyle,
  CommandItemTitleStyle,
  CommandListStyle,
  CommandModalContainer,
  CommandModalInputDividerStyle,
  CommandModalInputDividerWrapperStyle,
  CommandModalInputStyle,
} from './style';

export type CommandItemTypes = {
  type: string;
  mode: 'item' | 'title';
  title: string;
  meta?: MetaData;
};

const commandItemCls = 'command-item';
const commandHoverCls = 'hover';

const CmdModal = () => {
  const { onHidden, open } = useModalOpen(OpenTypeConfig.CommandOpen);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const [commandItems, setCommandItems] = useState<CommandItemTypes[]>([]);
  const [displayCommandItems, setDisplayCommandItems] = useState<
    CommandItemTypes[]
  >([]);
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');
  const { toggleTheme, updateTypography } = useTheme();

  useEffect(() => {
    const genCommandItems = () => {
      const commands: CommandItemTypes[] = [];

      // FIXME add sort fn
      Object.entries(metaData)
        .reverse()
        .forEach(([key, value]) => {
          commands.push({
            type: key,
            mode: 'title',
            title: upperCase(key),
          });

          value.forEach(i => {
            commands.push({
              type: key,
              mode: 'item',
              title: upperCase(i.name),
              meta: i,
            });
          });
        });

      // Mixin Blog Meta Data
      commands.push({
        type: 'blog',
        mode: 'title',
        title: 'blog',
      });

      BlogRoutes.children?.forEach(i => {
        commands.push({
          type: 'blog',
          mode: 'item',
          title: i.path!.split('/').join(' / '),
          meta: {
            path: `${import.meta.env.BASE_URL}rick/blog/${i.path!}`,
            name: '',
            parent: 'Blog',
          } as any,
        });
      });

      // Mixin Theme Meta Data
      commands.push({
        type: 'theme',
        mode: 'title',
        title: 'theme',
      });

      commands.push({
        type: 'theme',
        mode: 'item',
        title: 'dark',
      });

      commands.push({
        type: 'theme',
        mode: 'item',
        title: 'light',
      });

      commands.push({
        type: 'font',
        mode: 'title',
        title: 'font',
      });

      fonts.forEach(i => {
        commands.push({
          type: 'font',
          mode: 'item',
          title: i,
        });
      });

      setCommandItems(commands);
      setDisplayCommandItems(commands);
    };

    genCommandItems();
  }, []);

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

  const onClick = (item: CommandItemTypes) => {
    switch (item.type) {
      case 'theme': {
        toggleTheme(lowerCase(item.title) as ThemeMode);
        break;
      }

      case 'font': {
        updateTypography({ fontFamily: item.title });
        break;
      }

      default: {
        if (item.meta?.path) {
          navigate(item.meta.path);
          onHidden();
        }
      }
    }
  };

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
        onHidden();
        setDisplayCommandItems(commandItems);
        setSearchVal('');
      }}>
      <div css={CommandModalContainer}>
        <input
          value={searchVal}
          placeholder="Type a command or search…"
          css={CommandModalInputStyle}
          ref={commandInputRef}
          onChange={e => {
            const result = commandItems.filter(i => {
              return (
                toLower(i.title).includes(toLower(e.target.value)) ||
                (i.mode === 'title' &&
                  commandItems.some(
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
                key={`${item.type}-${item.title}`}
                data-type={item.mode}
                className={commandItemCls}
                css={
                  item.mode === 'title'
                    ? CommandItemTitleStyle
                    : CommandItemStyle(item)
                }
                onClick={() => {
                  onClick?.(item);
                }}>
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default CmdModal;
