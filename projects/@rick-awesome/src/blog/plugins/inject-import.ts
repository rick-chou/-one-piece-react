import * as acorn from 'acorn';

const impCodesanbox =
  "import Codesandbox from '@rickzhou/awesome/blog/components/codesandbox'";

const impCodepen =
  "import Codepen from '@rickzhou/awesome/blog/components/codepen'";

export default function retextSentenceSpacing() {
  return (tree: any, file: any) => {
    tree.children.unshift(
      {
        type: 'mdxjsEsm',
        value: impCodesanbox,
        data: {
          estree: acorn.parse(impCodesanbox, {
            ecmaVersion: 2020,
            sourceType: 'module',
          }),
        },
      },
      {
        type: 'mdxjsEsm',
        value: impCodepen,
        data: {
          estree: acorn.parse(impCodepen, {
            ecmaVersion: 2020,
            sourceType: 'module',
          }),
        },
      },
    );
  };
}
