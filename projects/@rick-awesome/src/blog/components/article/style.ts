import { useTheme } from '@rickzhou/react-ui';
import { css } from '@emotion/react';

export const codeBlockStyle = css`
  border-color: #ddd;
  color: #777;
  border: 1px solid;
  border-radius: 3px;
  box-shadow: 0 0 0 3px rgba(11, 13, 14, 0.02);
  font-size: 14px;
  margin: 2em auto;
  overflow: hidden;

  figcaption {
    background: var(--color-secondary-bg);
    border-bottom: 1px solid;
    display: flex;
    letter-spacing: 1px;
    padding-left: 12px;
    padding-right: 66px;
    margin: 0px;
  }
`;

export const codeBtnStyle = css`
  border-radius: 50%;
  display: inline-block;
  height: 12px;
  margin: 12px 6px 12px 0;
  min-width: 12px;

  &:nth-of-type(1) {
    background-color: red;
  }
  &:nth-of-type(2) {
    background-color: #ccc;
  }
  &:nth-of-type(3) {
    background-color: yellowgreen;
  }
`;

export const codeFilename = css`
  flex: 1;
  line-height: 36px;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
`;

export const useCodeStyle = () => {
  const { isDark } = useTheme();
  if (isDark()) {
    return css`
      pre code.hljs {
        display: block;
        overflow-x: auto;
        padding: 1em;
      }

      code.hljs {
        padding: 3px 5px;
      } /*!
        Theme: GitHub Dark
        Description: Dark theme as seen on github.com
        Author: github.com
        Maintainer: @Hirse
        Updated: 2021-05-15
      
        Outdated base version: https://github.com/primer/github-syntax-dark
        Current colors taken from GitHub's CSS
      */
      .hljs {
        color: #c9d1d9;
        background: #0d1117;
      }
      .hljs-doctag,
      .hljs-keyword,
      .hljs-meta .hljs-keyword,
      .hljs-template-tag,
      .hljs-template-variable,
      .hljs-type,
      .hljs-variable.language_ {
        color: #ff7b72;
      }
      .hljs-title,
      .hljs-title.class_,
      .hljs-title.class_.inherited__,
      .hljs-title.function_ {
        color: #d2a8ff;
      }
      .hljs-attr,
      .hljs-attribute,
      .hljs-literal,
      .hljs-meta,
      .hljs-number,
      .hljs-operator,
      .hljs-selector-attr,
      .hljs-selector-class,
      .hljs-selector-id,
      .hljs-variable {
        color: #79c0ff;
      }
      .hljs-meta .hljs-string,
      .hljs-regexp,
      .hljs-string {
        color: #a5d6ff;
      }
      .hljs-built_in,
      .hljs-symbol {
        color: #ffa657;
      }
      .hljs-code,
      .hljs-comment,
      .hljs-formula {
        color: #8b949e;
      }
      .hljs-name,
      .hljs-quote,
      .hljs-selector-pseudo,
      .hljs-selector-tag {
        color: #7ee787;
      }
      .hljs-subst {
        color: #c9d1d9;
      }
      .hljs-section {
        color: #1f6feb;
        font-weight: 700;
      }
      .hljs-bullet {
        color: #f2cc60;
      }
      .hljs-emphasis {
        color: #c9d1d9;
        font-style: italic;
      }
      .hljs-strong {
        color: #c9d1d9;
        font-weight: 700;
      }
      .hljs-addition {
        color: #aff5b4;
        background-color: #033a16;
      }
      .hljs-deletion {
        color: #ffdcd7;
        background-color: #67060c;
      }
    `;
  }

  return css`
    pre code.hljs {
      display: block;
      overflow-x: auto;
      padding: 1em;
    }

    code.hljs {
      padding: 3px 5px;
    } /*!
      Theme: GitHub
      Description: Light theme as seen on github.com
      Author: github.com
      Maintainer: @Hirse
      Updated: 2021-05-15
    
      Outdated base version: https://github.com/primer/github-syntax-light
      Current colors taken from GitHub's CSS
    */
    .hljs {
      color: #24292e;
      background: #fff;
    }
    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta .hljs-keyword,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable.language_ {
      color: #d73a49;
    }
    .hljs-title,
    .hljs-title.class_,
    .hljs-title.class_.inherited__,
    .hljs-title.function_ {
      color: #6f42c1;
    }
    .hljs-attr,
    .hljs-attribute,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-operator,
    .hljs-selector-attr,
    .hljs-selector-class,
    .hljs-selector-id,
    .hljs-variable {
      color: #005cc5;
    }
    .hljs-meta .hljs-string,
    .hljs-regexp,
    .hljs-string {
      color: #032f62;
    }
    .hljs-built_in,
    .hljs-symbol {
      color: #e36209;
    }
    .hljs-code,
    .hljs-comment,
    .hljs-formula {
      color: #6a737d;
    }
    .hljs-name,
    .hljs-quote,
    .hljs-selector-pseudo,
    .hljs-selector-tag {
      color: #22863a;
    }
    .hljs-subst {
      color: #24292e;
    }
    .hljs-section {
      color: #005cc5;
      font-weight: 700;
    }
    .hljs-bullet {
      color: #735c0f;
    }
    .hljs-emphasis {
      color: #24292e;
      font-style: italic;
    }
    .hljs-strong {
      color: #24292e;
      font-weight: 700;
    }
    .hljs-addition {
      color: #22863a;
      background-color: #f0fff4;
    }
    .hljs-deletion {
      color: #b31d28;
      background-color: #ffeef0;
    }
  `;
};
