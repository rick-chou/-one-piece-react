declare module 'flipdown';

declare module '*.js';
declare module '*.cjs';
declare module '*.mjs';

declare module '*.vue' {
  import { type defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module '*.mdx' {
  export const frontmatter: { title: string };
}

// Support markdown extensions from
// https://github.com/sindresorhus/markdown-extensions/blob/v1.1.1/markdown-extensions.json

/**
 * A markdown file which exports a JSX component.
 */
declare module '*.md' {
  export { default, frontmatter } from '*.mdx';
}
