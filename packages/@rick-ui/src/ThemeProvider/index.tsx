import { css, Global, type SerializedStyles } from '@emotion/react';
import { theme as antdTheme, ConfigProvider } from 'antd';
import { useEffect, type FC, type PropsWithChildren } from 'react';
import { AntdStyle } from './antd-style';
import { globalStyle } from './global-style';
import { useTheme } from './useTheme';

const Theme = () => {
  const { theme, followSystem, themeConfig, typography, toggleTheme } =
    useTheme();
  useEffect(() => {
    document.documentElement.setAttribute('class', theme);
  }, [theme]);

  useEffect(() => {
    // depend on system them mode
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onThemeChange = (e: MediaQueryListEvent) => {
      toggleTheme(e.matches ? 'dark' : 'light');
    };
    if (followSystem) {
      media.addEventListener('change', onThemeChange);
    } else {
      media.removeEventListener('change', onThemeChange);
    }

    return () => {
      media.removeEventListener('change', onThemeChange);
    };
  }, [followSystem, toggleTheme]);

  // convenient to refer to variables in css / scss
  // use themeConfig in css in js
  return (
    <Global
      styles={css(
        css`
          :root {
            --body-font: ${typography['fontFamily']};
            --code-font: ${typography['codeFontFamily']};
            --content-opacity: ${typography['opacity']};

            /* --color-active: #bae0ff; */
            --color-active: ${themeConfig[theme].colorActive};
            --color-primary-bg: ${themeConfig[theme].colorPrimaryBg};
            --color-secondary-bg: ${themeConfig[theme].colorSecondaryBg};
            --color-inverse-bg: ${themeConfig[theme].colorInverseBg};
            --color-primary-bg-hover: ${themeConfig[theme].colorPrimaryBgHover};
            --color-primary-text: ${themeConfig[theme].colorPrimaryText};
          }
        `,
        AntdStyle,
      )}
    />
  );
};

export const ThemeProvider: FC<
  PropsWithChildren<{ style?: SerializedStyles }>
> = ({ children, style }) => {
  const {
    theme,
    typography: { fontFamily },
  } = useTheme();
  return (
    <div className={theme} css={style}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily,
          },
          algorithm:
            theme === 'dark'
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
        }}>
        <Global styles={globalStyle} />
        <Theme />
        {children}
      </ConfigProvider>
    </div>
  );
};
