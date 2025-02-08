import Article from '@rickzhou/awesome/blog/components/article';
import Blog from '@rickzhou/awesome/blog/content/README.mdx';
import README from '../../../README.md';

const Homepage = () => {
  return (
    <Article>
      <Blog />
      <README />
    </Article>
  );
};

export default Homepage;
