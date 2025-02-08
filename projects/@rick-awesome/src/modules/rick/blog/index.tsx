import Article from '@rickzhou/awesome/blog/components/article';
import Sidebar from '@rickzhou/awesome/blog/content/sidebar.md';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <Article classname="prose-lg">
      <Sidebar
        components={{
          a: props => (
            <Link to={props.href!.split('.').at(0)!}>{props.children}</Link>
          ),
          ul: props => (
            <ul
              css={css({
                p: {
                  fontSize: '1.5rem',
                  fontWeight: 700,
                },
              })}
              {...props}></ul>
          ),
        }}
      />
    </Article>
  );
};

export default Blog;
