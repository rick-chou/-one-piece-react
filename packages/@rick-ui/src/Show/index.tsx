import { memoSVC } from '@rickzhou/react-utils';
import type { FC, ReactNode } from 'react';

type Children = (() => ReactNode) | ReactNode;

export type ShowProps = {
  /**
   * condition
   */
  when: boolean;
  fallback?: Children;
  children: Children;
};

const render = (children?: Children) => {
  if (typeof children === 'function') {
    return children();
  }

  return children;
};

const Show: FC<ShowProps> = memoSVC(({ when, fallback, children }) => {
  return <>{when ? render(children) : render(fallback)}</>;
});

export default Show;
