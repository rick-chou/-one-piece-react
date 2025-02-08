import ReactEditor from '@monaco-editor/react';
import { type EditorTheme } from '@rickzhou/react-editor/assets/editor-themes';
import { EditEditorOpts } from '@rickzhou/react-editor/config/editor';
import { useTheme } from '@rickzhou/react-editor/hooks/useTheme';
import { useEditorWrapperStyle } from '@rickzhou/react-editor/styles';
import { type CommandItemTypes } from '@rickzhou/react-editor/types';
import { getFileLanguage } from '@rickzhou/react-ui';
import { formatCode } from '@rickzhou/react-utils';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../../store';
import CmdModal from '../command-modal';
import EditorContextMenu, {
  useEditorContextMenu,
} from '../context-menu/editor';
import Tab from '../editor-tab';

const Editor = () => {
  const { state } = useContext(Context);
  const { changeTheme } = useTheme();
  const [content, setContent] = useState('');
  const { showEditorContextMenu } = useEditorContextMenu();
  const style = useEditorWrapperStyle();

  useEffect(() => {
    const file = state.fileSet[state.currentFilePath];
    if (file) {
      const reader = new FileReader();

      reader.onload = event => {
        setContent(event.target!.result as string);
      };

      reader.readAsText(file);
    }
  }, [state.currentFilePath, state.fileSet]);

  const format = useCallback(() => {
    setContent(formatCode(content));
  }, [content]);

  const onCommandItemClick = async (item: CommandItemTypes) => {
    if (item.mode === 'item') {
      if (item.type === 'theme') {
        await changeTheme(item.title as EditorTheme);
      }
    }
  };

  return (
    <div className="h-full">
      <Tab />
      <div
        css={style}
        onContextMenu={e => {
          showEditorContextMenu({ event: e });
        }}>
        <ReactEditor
          options={EditEditorOpts}
          value={content}
          onChange={v => {
            setContent(v ?? '');
          }}
          language={getFileLanguage(state.currentFilePath)}
        />
      </div>

      <CmdModal onClick={onCommandItemClick} />

      <EditorContextMenu />
    </div>
  );
};

export default Editor;
