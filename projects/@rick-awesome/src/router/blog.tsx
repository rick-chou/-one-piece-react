const blogs = import.meta.glob(['../blog/content/*/*.{md,mdx}']);

import Article from '@rickzhou/awesome/blog/components/article';
import { type RouteObject } from 'react-router-dom';

export const BlogRoutes: RouteObject = {
  path: 'rick/blog',
  children: Object.entries(blogs).map(([key, value]) => {
    return {
      path: key.split('../blog/content/').at(-1)!.split('.').at(0)!,
      async lazy() {
        const { default: Component, frontmatter } =
          // eslint-disable-next-line @typescript-eslint/consistent-type-imports
          (await value()) as typeof import('@rickzhou/awesome/blog/content/README.mdx');

        return {
          Component() {
            return (
              <div>
                <Article>
                  <h1>{frontmatter?.title}</h1>
                  <Component />
                </Article>
              </div>
            );
          },
        };
      },
    };
  }),
};
