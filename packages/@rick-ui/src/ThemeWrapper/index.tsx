import { type SerializedStyles } from '@emotion/react';
import { type PropsWithChildren } from 'react';
import { memoSVC } from '../../../@rick-utils';
import { useTheme } from '../ThemeProvider/useTheme';

export const ThemeWrapper = memoSVC<
  PropsWithChildren<{ style?: SerializedStyles }>
>(({ children, style }) => {
  const { theme } = useTheme();
  return (
    <div className={theme} css={style}>
      {children}
    </div>
  );
});
