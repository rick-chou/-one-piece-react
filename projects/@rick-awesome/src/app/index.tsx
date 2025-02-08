import Blog from '@rickzhou/awesome/blog/layout';
import CmdModal from '@rickzhou/awesome/components/commands';
import { ThemeProvider } from '@rickzhou/react-ui';
import { App as AppWrapper } from 'antd';
import { ScrollRestoration } from 'react-router-dom';

export const App = () => {
  return (
    <ThemeProvider>
      <ScrollRestoration />
      <AppWrapper>
        <CmdModal />
        <Blog />
      </AppWrapper>
    </ThemeProvider>
  );
};
