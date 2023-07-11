import { css } from '@emotion/react';

export const flipdownStyle = css`
  /********** Theme: dark **********/
  /* Font styles */
  .flipdown.flipdown__theme-dark {
    font-weight: bold;
  }
  /* Rotor group headings */
  .flipdown.flipdown__theme-dark .rotor-group-heading:before {
    color: #000000;
  }
  /* Delimeters */
  .flipdown.flipdown__theme-dark
    .rotor-group:nth-of-type(n + 2):nth-of-type(-n + 3):before,
  .flipdown.flipdown__theme-dark
    .rotor-group:nth-of-type(n + 2):nth-of-type(-n + 3):after {
    background-color: #151515;
  }
  /* Rotor tops */
  .flipdown.flipdown__theme-dark .rotor,
  .flipdown.flipdown__theme-dark .rotor-top,
  .flipdown.flipdown__theme-dark .rotor-leaf-front {
    color: #ffffff;
    background-color: #151515;
  }
  /* Rotor bottoms */
  .flipdown.flipdown__theme-dark .rotor-bottom,
  .flipdown.flipdown__theme-dark .rotor-leaf-rear {
    color: #efefef;
    background-color: #202020;
  }
  /* Hinge */
  .flipdown.flipdown__theme-dark .rotor:after {
    border-top: solid 1px #151515;
  }

  /********** Theme: light **********/
  /* Font styles */
  .flipdown.flipdown__theme-light {
    font-weight: bold;
  }
  /* Rotor group headings */
  .flipdown.flipdown__theme-light .rotor-group-heading:before {
    color: #eeeeee;
  }
  /* Delimeters */
  .flipdown.flipdown__theme-light
    .rotor-group:nth-of-type(n + 2):nth-of-type(-n + 3):before,
  .flipdown.flipdown__theme-light
    .rotor-group:nth-of-type(n + 2):nth-of-type(-n + 3):after {
    background-color: #dddddd;
  }
  /* Rotor tops */
  .flipdown.flipdown__theme-light .rotor,
  .flipdown.flipdown__theme-light .rotor-top,
  .flipdown.flipdown__theme-light .rotor-leaf-front {
    color: #222222;
    background-color: #dddddd;
  }
  /* Rotor bottoms */
  .flipdown.flipdown__theme-light .rotor-bottom,
  .flipdown.flipdown__theme-light .rotor-leaf-rear {
    color: #333333;
    background-color: #eeeeee;
  }
  /* Hinge */
  .flipdown.flipdown__theme-light .rotor:after {
    border-top: solid 1px #222222;
  }

  /* END OF THEMES */

  .flipdown {
    overflow: visible;
    width: 100%;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flipdown .rotor-group {
    position: relative;
    float: left;
    padding-right: 30px;
  }

  .flipdown .rotor-group:last-child {
    padding-right: 0;
  }

  .flipdown .rotor-group-heading:before {
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .flipdown .rotor-group:nth-of-type(1) .rotor-group-heading:before {
    content: attr(data-before);
  }

  .flipdown .rotor-group:nth-of-type(2) .rotor-group-heading:before {
    content: attr(data-before);
  }

  .flipdown .rotor-group:nth-of-type(3) .rotor-group-heading:before {
    content: attr(data-before);
  }

  .flipdown .rotor-group:nth-of-type(4) .rotor-group-heading:before {
    content: attr(data-before);
  }

  .flipdown .rotor-group:nth-of-type(n + 2):nth-of-type(-n + 3):before {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 115px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .flipdown .rotor-group:nth-of-type(n + 2):nth-of-type(-n + 3):after {
    content: '';
    position: absolute;
    bottom: 50px;
    left: 115px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .flipdown .rotor {
    position: relative;
    float: left;
    width: 50px;
    height: 80px;
    margin: 0px 5px 0px 0px;
    border-radius: 4px;
    font-size: 4rem;
    text-align: center;
    perspective: 200px;
  }

  .flipdown .rotor:last-child {
    margin-right: 0;
  }

  .flipdown .rotor-top,
  .flipdown .rotor-bottom {
    overflow: hidden;
    position: absolute;
    width: 50px;
    height: 40px;
  }

  .flipdown .rotor-leaf {
    z-index: 1;
    position: absolute;
    width: 50px;
    height: 80px;
    transform-style: preserve-3d;
    transition: transform 0s;
  }

  .flipdown .rotor-leaf.flipped {
    transform: rotateX(-180deg);
    transition: all 0.5s ease-in-out;
  }

  .flipdown .rotor-leaf-front,
  .flipdown .rotor-leaf-rear {
    overflow: hidden;
    position: absolute;
    width: 50px;
    height: 40px;
    margin: 0;
    transform: rotateX(0deg);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .flipdown .rotor-leaf-front {
    line-height: 80px;
    border-radius: 4px 4px 0px 0px;
  }

  .flipdown .rotor-leaf-rear {
    line-height: 0px;
    border-radius: 0px 0px 4px 4px;
    transform: rotateX(-180deg);
  }

  .flipdown .rotor-top {
    line-height: 80px;
    border-radius: 4px 4px 0px 0px;
  }

  .flipdown .rotor-bottom {
    bottom: 0;
    line-height: 0px;
    border-radius: 0px 0px 4px 4px;
  }

  .flipdown .rotor:after {
    content: '';
    z-index: 2;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 50px;
    height: 40px;
    border-radius: 0px 0px 4px 4px;
  }

  @media (max-width: 550px) {
    .flipdown {
      width: 312px;
      height: 70px;
    }

    .flipdown .rotor {
      font-size: 2.2rem;
      margin-right: 3px;
    }

    .flipdown .rotor,
    .flipdown .rotor-leaf,
    .flipdown .rotor-leaf-front,
    .flipdown .rotor-leaf-rear,
    .flipdown .rotor-top,
    .flipdown .rotor-bottom,
    .flipdown .rotor:after {
      width: 30px;
    }

    .flipdown .rotor-group {
      padding-right: 20px;
    }

    .flipdown .rotor-group:last-child {
      padding-right: 0px;
    }

    .flipdown .rotor-group-heading:before {
      font-size: 0.8rem;
      height: 20px;
      line-height: 20px;
    }

    .flipdown .rotor-group:nth-of-type(n + 2):nth-of-type(-n + 3):before,
    .flipdown .rotor-group:nth-of-type(n + 2):nth-of-type(-n + 3):after {
      left: 69px;
    }

    .flipdown .rotor-group:nth-of-type(n + 2):nth-of-type(-n + 3):before {
      bottom: 13px;
      height: 8px;
      width: 8px;
    }

    .flipdown .rotor-group:nth-of-type(n + 2):nth-of-type(-n + 3):after {
      bottom: 29px;
      height: 8px;
      width: 8px;
    }

    .flipdown .rotor-leaf-front,
    .flipdown .rotor-top {
      line-height: 50px;
    }

    .flipdown .rotor-leaf,
    .flipdown .rotor {
      height: 50px;
    }

    .flipdown .rotor-leaf-front,
    .flipdown .rotor-leaf-rear,
    .flipdown .rotor-top,
    .flipdown .rotor-bottom,
    .flipdown .rotor:after {
      height: 25px;
    }
  }
`;
