import * as acorn from 'acorn';

// FIXME update path
const impCodesanbox = "import Codesandbox from '@/blog/components/codesandbox'";

const impCodepen = "import Codepen from '@/blog/components/codepen'";

const impMsc = "import SequenceChart from '@/blog/components/sequence-chart'";

export default function retextSentenceSpacing() {
  return tree => {
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
      {
        type: 'mdxjsEsm',
        value: impMsc,
        data: {
          estree: acorn.parse(impMsc, {
            ecmaVersion: 2020,
            sourceType: 'module',
          }),
        },
      },
    );
  };
}
