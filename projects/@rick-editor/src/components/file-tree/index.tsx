import { Global } from '@emotion/react';
import { useTabs } from '@rickzhou/react-editor/hooks/useTabs';
import { useSiderTheme } from '@rickzhou/react-editor/styles';
import { getFileIcon } from '@rickzhou/react-ui';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { isEmpty } from 'lodash-es';
import { type TreeNodeProps } from 'rc-tree';
import React, { useContext, useState } from 'react';
import { Context } from '../../store';
import { ActionType, type FileTreeTypes } from '../../types';
import SiderContextMenu, { useSiderContextMenu } from '../context-menu/sider';

type FileTreeProps = Record<string, unknown>;

const FileTree: React.FC<FileTreeProps> = () => {
  const { state, dispatch } = useContext(Context);
  const { showSiderContextMenu } = useSiderContextMenu();
  const { updateTabs } = useTabs();
  const [treeData, setTreeData] = useState(state.fileTree.children);
  const onDrop: TreeProps['onDrop'] = info => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          callback(data[i], i, data);
          return;
        }

        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };

    const data = [...treeData];

    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, item => {
        item.children = item.children ?? [];
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children ?? [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }

    setTreeData(data);
  };

  const theme = useSiderTheme();

  return (
    <div
      className="h-full"
      onContextMenu={e => {
        showSiderContextMenu({ event: e });
      }}>
      <Global styles={theme} />
      {isEmpty(state.fileSet) ? (
        <div className="rick-file-tree flex justify-center items-center">
          <div className="text-[5rem] rotate-90">@RickZhou/Editor</div>
        </div>
      ) : (
        <Tree.DirectoryTree
          rootClassName="rick-file-tree"
          allowDrop={options => {
            return (
              (options.dragNode.key as string).split('/')?.at(-2) !==
              (options.dropNode.key as string).split('/')?.at(-2)
            );
          }}
          draggable={{ icon: false }}
          switcherIcon={() => <div className="hidden" />}
          onSelect={([key]) => {
            dispatch({
              type: ActionType.UPDATE_CURRENT_FILE_PATH,
              payload: { currentFilePath: key as string },
            });
            updateTabs(key as string);
          }}
          icon={(props: TreeNodeProps<FileTreeTypes>) => (
            <div className="w-[80%] translate-y-[10%]">
              {getFileIcon(props.data!.title, props.data!.dir, props.expanded!)}
            </div>
          )}
          showIcon
          onDrop={onDrop}
          treeData={state.fileTree.children}
        />
      )}

      <SiderContextMenu />
    </div>
  );
};

export default FileTree;
