import { metaData } from '@rickzhou/awesome/router/meta-data';
import { genRandomSvg } from '@rickzhou/awesome/utils';
import { isEmpty, startCase, upperCase } from 'lodash-es';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  logoStyle,
  sideMenuStyle,
  sideTitleStyle,
  sideWrapperStyle,
  sidebarStyle,
} from '../style';

const SideBar = () => {
  return (
    <div css={sidebarStyle}>
      <Link css={logoStyle} to={import.meta.env.BASE_URL}>
        @{import.meta.env.RICK_AUTHOR}
      </Link>
      {!isEmpty(metaData) &&
        Object.entries(metaData)
          .reverse()
          .map(([key, value]) => {
            return (
              <div css={sideWrapperStyle} key={key}>
                <div css={sideTitleStyle}>{upperCase(key)}</div>
                <div css={sideMenuStyle}>
                  {value.map(i => (
                    <Link to={i.path} key={i.path}>
                      <div
                        dangerouslySetInnerHTML={{ __html: genRandomSvg() }}
                      />
                      {startCase(i.name)}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default memo(SideBar);
