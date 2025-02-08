import { css } from '@emotion/react';

export const CommandModalContainer = css({
  paddingTop: '1rem',
  paddingBottom: '0.5rem',
});

export const CommandModalInputStyle = css({
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#e5e5e5',
  width: '100%',
  fontSize: '16px',
  lineHeight: 1,
  padding: '16px',
  marginLeft: '1rem',
  marginRight: '1rem',
});

export const CommandModalInputDividerWrapperStyle = css({
  paddingLeft: '16px',
  paddingRight: '16px',
  marginBottom: '4px',
});

export const CommandModalInputDividerStyle = css({
  backgroundColor: '#e5e5e514',
  height: '1px',
  border: 'none',
});

export const CommandItemTitleStyle = css({
  color: 'rgb(128, 128, 128)',
  fontSize: '12px',
  fontWeight: 700,
  paddingTop: '8px',
  paddingBottom: '8px',
  userSelect: 'none',
  paddingLeft: '16px',
  marginLeft: '1rem',
});

export const CommandListStyle = css({
  height: '24rem',
  maxHeight: '24rem',
  overflowY: 'scroll',
});

export const CommandItemStyle = css({
  color: 'var(--color-primary-text)',
  fontSize: '13px',
  height: '36px',
  paddingTop: '8px',
  paddingBottom: '8px',
  userSelect: 'none',
  paddingLeft: '24px',
  cursor: 'pointer',
  marginLeft: '1rem',
  marginRight: '1rem',
  '&.hover': {
    backgroundColor: 'var(--color-primary-bg-hover)',
    borderRadius: '4px',
  },
});

export const CommandHotkeyStyle = css({
  borderRadius: '4px',
  padding: '4px',
  lineHeight: 1,
  margin: '0px',
  height: '20px',
  minWidth: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'uppercase',
  backgroundColor: '#e5e5e51a',
  fontSize: '12px',
  color: '#e5e5e5',
  userSelect: 'none',
});
