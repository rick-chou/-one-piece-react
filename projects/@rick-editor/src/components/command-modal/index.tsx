import { genCommandItems } from '@rickzhou/react-editor/config/editor';
import {
  CommandHotkeyItemStyle,
  CommandHotkeyTitleStyle,
  CommandModalInputDividerStyle,
  CommandModalInputDividerWrapperStyle,
  CommandModalInputStyle,
} from '@rickzhou/react-editor/styles';
import {
  ActionType,
  type CommandItemTypes,
} from '@rickzhou/react-editor/types';
import { List, Modal } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Context } from '../../store';

type CmdModalProps = {
  onClick: (item: CommandItemTypes) => void;
};

const CmdModal: React.FC<CmdModalProps> = ({ onClick }) => {
  const { state, dispatch } = useContext(Context);
  const commandInputRef = useRef<HTMLInputElement>(null);

  const toggleCommandModal = useCallback(() => {
    dispatch({
      type: ActionType.UPDATE_COMMAND_MODAL_OPEN,
      payload: { commandModalOpen: !state.commandModalOpen },
    });
  }, [dispatch, state.commandModalOpen]);

  useEffect(() => {
    if (state.commandModalOpen) {
      setTimeout(() => {
        commandInputRef.current?.focus();
      }, 300);
    }
  }, [state.commandModalOpen]);

  return (
    <Modal
      title={null}
      footer={null}
      open={state.commandModalOpen}
      bodyStyle={{ padding: 0 }}
      closable={false}
      maskClosable
      mask={false}
      onCancel={toggleCommandModal}>
      <div>
        <input
          placeholder="Type a command or search…"
          css={CommandModalInputStyle}
          ref={commandInputRef}
        />

        <div css={CommandModalInputDividerWrapperStyle}>
          <hr css={CommandModalInputDividerStyle} />
        </div>

        <List>
          <VirtualList
            data={genCommandItems()}
            height={400}
            itemHeight={36}
            itemKey="title">
            {item => {
              return (
                <div
                  key={item.title}
                  css={
                    item.mode === 'title'
                      ? CommandHotkeyTitleStyle
                      : CommandHotkeyItemStyle
                  }
                  onClick={() => {
                    onClick(item);
                  }}>
                  {item.title}
                </div>
              );
            }}
          </VirtualList>
        </List>
      </div>
    </Modal>
  );
};

export default CmdModal;
