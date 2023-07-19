import { Bg } from '@/assets/pic';
import { css, keyframes } from '@emotion/react';

const bottomShow = keyframes`
   0% {
      transform: translateY(100px);
      opacity: 0;
    }

    100% {
      opacity: 1;
      transform: none;
    }
`;

export const animationDelay = (delay: number) =>
  css`
    animation: ${bottomShow} 0.8s ${delay}s both;
  `;

export const globalStyle = css`
  ::-webkit-scrollbar {
    width: 2px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-primary-bg-hover);
    border-radius: 10px;
  }

  body {
    font-family: var(--body-font);
    color: var(--color-primary-text);
    background-image: url(${Bg});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-blend-mode: color-dodge;
    background-color: rgba(18, 21, 39, 0.86);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1em 2em;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    user-select: none;
    &:before {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
      content: '';
    }
  }
`;

export const containerStyle = css`
  background-color: var(--color-primary-bg);
  min-width: 65vw;
  max-width: 65vw;
  max-height: 900px;
  height: 95vh;
  display: flex;
  overflow: hidden;
  width: 100%;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  position: relative;
`;

export const sidebarStyle = css`
  width: 220px;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition-duration: 0.2s;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const logoStyle = css`
  text-decoration: none;
  color: var(--color-primary-text);
  font-size: 19px;
  font-weight: 600;
  line-height: 34px;
  position: sticky;
  top: 0;
  &:before {
    content: '';
    position: absolute;
    top: -30px;
    left: 0;
    background: var(--color-primary-bg);
    width: 200px;
    height: 70px;
    z-index: -1;
  }
`;

export const sideMenuStyle = css`
  display: flex;
  flex-direction: column;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--color-primary-text);
    & + a {
      margin-top: 26px;
    }
  }
  svg {
    width: 30px;
    padding: 2px;
    border-radius: 10px;
    background-color: var(--color-secondary-bg);
    flex-shrink: 0;
    margin-right: 16px;
  }
`;

export const sideTitleStyle = css`
  font-size: 12px;
  letter-spacing: 0.07em;
  margin-bottom: 24px;
`;

export const sideWrapperStyle = css`
  border-bottom: 1px solid var(--color-primary-bg-hover);
  padding: 36px 0;
  width: 145px;
  &:last-child {
    border-bottom: none;
  }
`;

export const headerStyle = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 30px;
`;

export const searchBarStyle = css`
  height: 34px;
  display: flex;
  width: 100%;
  max-width: 450px;
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: var(--color-secondary-bg);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    padding: 0 40px 0 16px;
    box-shadow: 0 0 0 2px rgba(134, 140, 160, 0.02);
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
    background-size: 14px;
    background-repeat: no-repeat;
    background-position: 96%;
  }
`;

export const userStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  padding-left: 20px;
  flex-shrink: 0;
  margin-left: auto;
  svg {
    flex-shrink: 0;
    @media screen and (max-width: 575px) {
      display: none;
    }
  }
`;

export const userImgStyle = css`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 50%;
`;

export const userNameStyle = css`
  font-size: 14px;
  margin: 0 6px 0 12px;
  @media screen and (max-width: 575px) {
    display: none;
  }
`;

export const notifyStyle = css`
  position: relative;
  svg {
    width: 20px;
    margin-left: 24px;
    flex-shrink: 0;
  }
`;

export const notificationStyle = css`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ec5252;
  position: absolute;
  right: 1px;
  border: 1px solid var(--color-primary-bg);
  top: -2px;
  @media screen and (max-width: 575px) {
    display: none;
  }
`;

export const mainContainerStyle = css`
  padding: 0 30px 30px;
  overflow: auto;
`;

export const mainHeaderStyle = css`
  font-size: 30px;
  font-weight: 700;
  padding-bottom: 20px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 11;
`;
