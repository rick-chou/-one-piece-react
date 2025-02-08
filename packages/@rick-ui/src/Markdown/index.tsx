import { css } from '@emotion/react';
import { MDXProvider } from '@mdx-js/react';
import { memoSVC } from '@root/packages/@rick-utils';
import { Image } from 'antd';
import { Mermaid } from 'mdx-mermaid/Mermaid';
import { type PropsWithChildren } from 'react';
import { codeFontFamily } from '../../config/theme';
import Codepen from './components/codepen';
import Codesandbox from './components/codesandbox';
import SequenceChart from './components/sequence-chart';
import {
  codeBlockStyle,
  codeBtnStyle,
  codeFilename,
  useCodeStyle,
} from './style';

export type MarkdownProps = PropsWithChildren<{ classname?: string }>;

const Markdown = memoSVC<MarkdownProps>(({ children, classname = '' }) => {
  const codeStyle = useCodeStyle();
  return (
    <div
      className={`px-8 pb-8 prose prose-slate overflow-auto w-full! max-w-full! dark:prose-invert select-text! no-scrollbar ${classname}`}
    >
      <MDXProvider
        components={{
          a: (props) => <a target="_blank" {...props} className="italic"></a>,
          pre(props) {
            return (
              <div className="not-prose" css={codeStyle}>
                <figure css={codeBlockStyle}>
                  <figcaption>
                    <span css={codeBtnStyle} />
                    <span css={codeBtnStyle} />
                    <span css={codeBtnStyle} />
                    <span css={codeFilename}>
                      {props.filename ??
                        props?.children?.props?.className?.split('-').at(-1)}
                    </span>
                  </figcaption>
                  <pre
                    {...props}
                    className="bg-[#002b36]!"
                    css={css({ code: { fontFamily: codeFontFamily } })}
                  ></pre>
                </figure>
              </div>
            );
          },
          img: (props) => <Image src={props.src} />,
          mermaid: Mermaid,
          Mermaid,
          Codesandbox: (props) => <Codesandbox {...props} />,
          Codepen: (props) => <Codepen {...props} />,
          SequenceChart: (props) => <SequenceChart {...props} />,
        }}
      >
        {children}
      </MDXProvider>
    </div>
  );
});

export default Markdown;
