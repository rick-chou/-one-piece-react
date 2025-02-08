import { UploadOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import { Assets, Switch, ThemeSwitch, useTheme } from '@rickzhou/react-ui';
import { memoSVC } from '@rickzhou/react-utils';
import { Button, Divider, Image, Slider, Space, Upload } from 'antd';
import { type PropsWithChildren, type ReactNode } from 'react';
import styled from 'styled-components';
import { fonts } from '../../../theme';

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SettingItemTitle = styled.div`
  width: 40%;
`;

const SettingItemLabel = styled.div``;

const SettingItemDesc = styled.div`
  font-size: 10px;
  font-style: italic;
`;

const SettingItemConfig = styled.div<{ $block?: boolean }>`
  ${props => props.$block && 'flex: 1;'}
`;

const Setting = memoSVC<
  PropsWithChildren<{ label: ReactNode; desc?: ReactNode; block?: boolean }>
>(({ label, desc, children, block }) => {
  return (
    <div>
      <SettingItem>
        <SettingItemTitle>
          <SettingItemLabel>{label}</SettingItemLabel>
          <SettingItemDesc>{desc}</SettingItemDesc>
        </SettingItemTitle>
        <SettingItemConfig $block={block}>{children}</SettingItemConfig>
      </SettingItem>
      <Divider />
    </div>
  );
});

const Appearance = memoSVC(() => {
  const { typography, updateTypography, followSystem, updateIsFollowSystem } =
    useTheme();
  return (
    <Space className="w-full pt-4" direction="vertical">
      <Setting label="Theme">
        <ThemeSwitch className="h-4! w-4! scale-[0.2] transform-[translateX(-70px)]" />
      </Setting>

      <Setting label="Follow the system theme">
        <Switch
          className="h-4! w-4! scale-[0.2] transform-[translateX(-70px)]"
          value={followSystem}
          onChange={followSystem => updateIsFollowSystem(followSystem)}
        />
      </Setting>

      <Setting label="Opacity" block>
        <Slider
          value={typography.opacity}
          min={50}
          onChange={opacity => {
            updateTypography({ opacity });
          }}
        />
      </Setting>

      {/* <Setting label="Background" block>
        <Image
          src={Assets.Bg2}
          className="rounded-xl shadow dark:shadow-white"
        />
        <Upload>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Setting> */}

      <Setting label="Font" block>
        <CheckCard.Group
          className="w-full"
          value={typography.fontFamily}
          onChange={fontFamily => {
            updateTypography({ fontFamily: fontFamily as string });
          }}>
          {fonts.map(font => {
            return (
              <CheckCard
                style={{ fontFamily: font }}
                className="w-full!"
                title={font}
                description="Your limitation - it's only your imagination."
                value={font}
              />
            );
          })}
        </CheckCard.Group>
      </Setting>
    </Space>
  );
});

export default Appearance;
