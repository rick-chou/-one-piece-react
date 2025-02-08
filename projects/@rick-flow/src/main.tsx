import { persistor, store } from '@rickzhou/react-flow/store';
import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { router } from './router';

import '@rickzhou/react-ui/tailwind.css';
import 'reactflow/dist/style.css';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
      },
    }}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} fallbackElement={<div />} />
      </PersistGate>
    </Provider>
  </ConfigProvider>,
);
