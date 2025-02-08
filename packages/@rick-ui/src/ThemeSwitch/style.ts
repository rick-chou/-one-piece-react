import { css } from '@emotion/react';

export const themeSwitchStyle = css`
  &.light {
    .btn-switch {
      right: auto;
      left: 9%;
      animation: animationClickOn 0.7s;
    }

    .anticon-moon {
      animation: rotateOn 0.7s;
    }

    .anticon-sun {
      animation: shakeOff 0.7s;
    }
  }

  &.dark {
    .btn-switch {
      left: auto;
      right: 9%;
      animation: animationClickOff 0.7s;
    }

    .anticon-moon {
      animation: rotateOn 0.7s;
    }

    .anticon-sun {
      animation: shakeOff 0.7s;
    }
  }

  .theme-switch {
    #switch {
      background-color: var(--color-secondary-bg);
      animation: clickOff 0.5s;
    }

    height: 65vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    #switch {
      border: none;
      width: 15vw;
      height: 8vw;
      border-radius: 4vw;
      position: absolute;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .btn-switch {
        display: block;
        background-color: var(--color-active);
        width: 6vw;
        height: 6vw;
        border-radius: 3vw;
        position: absolute;
        z-index: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  // animations
  @keyframes clickOff {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.9);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes clickOn {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.9);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes shakeOff {
    0% {
      transform: scale3d(1, 1, 1);
    }

    30% {
      transform: scale3d(0.75, 1.25, 1);
    }

    40% {
      transform: scale3d(1.25, 0.75, 1);
    }

    50% {
      transform: scale3d(0.85, 1.15, 1);
    }

    65% {
      transform: scale3d(1.05, 0.95, 1);
    }

    75% {
      transform: scale3d(0.95, 1.05, 1);
    }

    100% {
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes shakeOn {
    0% {
      transform: scale3d(1, 1, 1);
    }

    30% {
      transform: scale3d(1.25, 0.75, 1);
    }

    40% {
      transform: scale3d(0.75, 1.25, 1);
    }

    50% {
      transform: scale3d(1.15, 0.85, 1);
    }

    65% {
      transform: scale3d(0.95, 1.05, 1);
    }

    75% {
      transform: scale3d(1.05, 0.95, 1);
    }

    100% {
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes rotateOff {
    50% {
      transform: rotate(180deg);
    }
  }

  @keyframes rotateOn {
    50% {
      transform: rotate(-180deg);
    }
  }

  @keyframes animationClickOff {
    0% {
      right: auto;
      left: 9%;
    }

    50% {
      width: 13vw;
    }

    100% {
      left: auto;
      right: 9%;
    }
  }

  @keyframes animationClickOn {
    0% {
      left: auto;
      right: 9%;
    }

    50% {
      width: 13vw;
    }

    100% {
      right: auto;
      left: 9%;
    }
  }
`;
