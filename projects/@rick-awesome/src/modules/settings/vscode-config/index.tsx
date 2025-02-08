import { Editor } from '@rickzhou/react-ui';
import { memoSVC, prettyJsonString } from '@rickzhou/react-utils';
import plugins from '@root/configs/vscode-plugins.txt?raw';
import settings from '@root/configs/vscode-settings.json?raw';
import { Segmented, Space, Tabs } from 'antd';
import { useState } from 'react';
import { contentHeight } from '../../../theme';

enum Tab {
  Settings = 'Settings',
  Plugins = 'Plugins',
}

const VscodeConfig = memoSVC(() => {
  const [currentTab, setCurrentTab] = useState(Tab.Settings);
  return (
    <Space direction="vertical" className="w-full">
      <Segmented<Tab> options={Object.values(Tab)} onChange={setCurrentTab} />
      <Tabs
        activeKey={currentTab}
        renderTabBar={() => <div />}
        items={[
          {
            label: Tab.Settings,
            key: Tab.Settings,
            children: (
              <Editor
                language="json"
                height={contentHeight}
                value={prettyJsonString(settings)}
                readOnly
              />
            ),
          },
          {
            label: Tab.Plugins,
            key: Tab.Plugins,
            children: (
              <Editor
                language="json"
                height={contentHeight}
                value={plugins}
                readOnly
              />
            ),
          },
        ]}
      />
    </Space>
  );
});

export default VscodeConfig;
