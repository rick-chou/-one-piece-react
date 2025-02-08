import { MoonFilled, SunFilled } from '@ant-design/icons';
import { memoSVC } from '@rickzhou/react-utils';
import { useTheme } from '../ThemeProvider/useTheme';
import { ThemeWrapper } from '../ThemeWrapper';
import { themeSwitchStyle } from './style';

export type ThemeSwitchProps = {
  className?: string;
};

export const ThemeSwitch = memoSVC<ThemeSwitchProps>(({ className = '' }) => {
  const { toggleTheme, isDark, followSystem } = useTheme();
  const iconStyles = {
    fontSize: '4vw',
    color: isDark() ? '#FFF' : '#000',
  };

  return (
    <ThemeWrapper style={themeSwitchStyle}>
      <div className={`theme-switch ${className}`}>
        <button
          type="button"
          id="switch"
          className={`${followSystem ? 'cursor-not-allowed!' : ''}`}
          disabled={followSystem}
          onClick={() => {
            toggleTheme();
          }}>
          <SunFilled style={{ ...iconStyles, opacity: isDark() ? 100 : 0 }} />

          <span className="btn-switch">
            {isDark() ? (
              <MoonFilled style={iconStyles} />
            ) : (
              <SunFilled style={iconStyles} />
            )}
          </span>

          <MoonFilled style={{ ...iconStyles, opacity: isDark() ? 0 : 100 }} />
        </button>
      </div>
    </ThemeWrapper>
  );
});
