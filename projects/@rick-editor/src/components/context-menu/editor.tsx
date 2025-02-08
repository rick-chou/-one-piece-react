import { CtxMenu, RickHotKey } from '@rickzhou/react-editor/config/hotkey';
import { useCallback } from 'react';

import { useCommandModal } from '@rickzhou/react-editor/hooks/useCommandModal';
import { Menu, useContextMenu } from 'react-contexify';

export const EditorCtxMenu = 'editor_context_menu';

export const useEditorContextMenu = () => {
  const { show } = useContextMenu({ id: EditorCtxMenu });

  return {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    showEditorContextMenu: useCallback(show, []),
  };
};

const EditorContextMenu = () => {
  const { commandModalOpen, toggleCommandModal } = useCommandModal();

  return (
    <div>
      <Menu id={EditorCtxMenu} theme="dark">
        <CtxMenu hotkey={RickHotKey.format} title="Format" onClick={() => {}} />
        <CtxMenu
          hotkey={RickHotKey.cmd}
          title="Command Palette..."
          onClick={toggleCommandModal}
        />
      </Menu>
    </div>
  );
};

export default EditorContextMenu;
