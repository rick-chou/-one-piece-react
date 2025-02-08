import { css } from '@emotion/react';
import { type FC, type PropsWithChildren } from 'react';
import { contentHeight } from '.';

export const ContentWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: contentHeight,
        overflowY: 'scroll',
      })}>
      {children}
    </div>
  );
};
