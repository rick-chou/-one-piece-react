import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Editor from '@rickzhou/react-repl/editor/core';
import { useTabs } from '@rickzhou/react-repl/hooks/useTabs';
import { defaultTabs } from '@rickzhou/react-repl/setup/defaultTabs';
import { type ReplProps, type Tab } from '@rickzhou/react-repl/types';
import { getFileIcon } from '@rickzhou/react-ui';
import { Dropdown, Popconfirm, Tabs, type MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';

type DraggableTabPaneProps = {
  'data-node-key': string;
} & React.HTMLAttributes<HTMLDivElement>;

const defaultActiveTab = 'file:///app.tsx';

const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props['data-node-key'],
    });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
    cursor: 'move',
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

const EditorTabs: React.FC<ReplProps> = ({ compiler, formatter, linter }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveTab);
  const { updateTab, tabs } = useTabs();

  const renderTabs = (tabs: Tab[]) =>
    tabs.map(i => ({
      key: i.path,
      closeIcon: defaultTabs.some(j => j.path === i.path) || (
        <Popconfirm
          title={`Delete ${i.path.split('/').at(-1)} ?`}
          onConfirm={() => {
            remove(i.path);
          }}
          okText="Yes"
          cancelText="No">
          <CloseOutlined />
        </Popconfirm>
      ),
      label: (
        <span className="flex justify-center items-center gap-2 -translate-y-[1px]">
          {getFileIcon(i.path.split('/').at(-1)!, false, false)}
          {i.path.split('/').at(-1)}
        </span>
      ),
      children: (
        <Editor
          url={i.path}
          displayErrors
          formatter={formatter}
          compiler={compiler}
          linter={linter}
        />
      ),
    }));

  const [items, setItems] = useState(() => renderTabs(tabs));

  useEffect(() => {
    setItems(() => renderTabs(tabs));
  }, [tabs]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setItems(prev => {
        const activeIndex = prev.findIndex(i => i.key === active.id);
        const overIndex = prev.findIndex(i => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const add = (type: 'tsx' | 'css') => {
    const customTabs = tabs.filter(
      i => i.path.startsWith('file:///Untitled') && i.path.endsWith(type),
    );
    const maxIdx = Math.max(
      ...customTabs.map(i => Number(/\d/.exec(i?.path)?.[0])),
    );
    const idx = Number.isFinite(maxIdx) ? maxIdx + 1 : 1;
    const newActiveKey = `file:///Untitled${idx}.${type}`;
    updateTab(newActiveKey, 'add');
    setActiveKey(newActiveKey);
  };

  const remove = (path: string) => {
    updateTab(path, 'remove');
    setActiveKey(defaultActiveTab);
  };

  const fileTypesMenu: MenuProps['items'] = [
    {
      key: 'tsx',
      label: (
        <div
          className="flex items-center gap-2"
          onClick={() => {
            add('tsx');
          }}>
          {getFileIcon('demo.tsx', false, false)}
          tsx
        </div>
      ),
    },
    {
      key: 'css',
      label: (
        <div
          className="flex items-center gap-2"
          onClick={() => {
            add('css');
          }}>
          {getFileIcon('demo.css', false, false)}
          css
        </div>
      ),
    },
  ];

  return (
    <Tabs
      addIcon={
        <Dropdown menu={{ items: fileTypesMenu }} placement="bottom" arrow>
          <PlusOutlined />
        </Dropdown>
      }
      type="editable-card"
      items={items}
      onTabClick={setActiveKey}
      activeKey={activeKey}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
          <SortableContext
            items={items.map(i => i.key)}
            strategy={horizontalListSortingStrategy}>
            <DefaultTabBar {...tabBarProps}>
              {node => (
                <DraggableTabNode {...node.props} key={node.key}>
                  {node}
                </DraggableTabNode>
              )}
            </DefaultTabBar>
          </SortableContext>
        </DndContext>
      )}
    />
  );
};

export default EditorTabs;
