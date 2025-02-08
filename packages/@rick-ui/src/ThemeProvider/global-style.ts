import { css } from '@emotion/react';
import { Bg2 } from '../../assets';

export const globalStyle = css`
  ::-webkit-scrollbar {
    width: 2px !important;
    border-radius: 10px !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-primary-bg-hover) !important;
    border-radius: 10px !important;
  }

  body {
    font-family: var(--body-font);
    color: var(--color-primary-text);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-blend-mode: color-dodge;
    background-color: rgba(18, 21, 39, 0.86);
    background-image: url(${Bg2});
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1em 2em;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    user-select: none;
  }
`;
