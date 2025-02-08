import { App } from '@rickzhou/awesome/app';
import ErrorPage from '@rickzhou/awesome/components/error-page';
import {
  createBrowserRouter,
  redirect,
  type RouteObject,
} from 'react-router-dom';
import { BlogRoutes } from './blog';
import { genRoutes } from './meta-data';

const RickRoutes: RouteObject = genRoutes('rick');
const DemoRoutes: RouteObject = genRoutes('demo');
const ChartRoutes: RouteObject = genRoutes('chart');
const SettingsRoutes: RouteObject = genRoutes('settings');
// const PreviewRoutes: RouteObject = genRoutes('preview');

export const routes: RouteObject[] = [
  {
    path: import.meta.env.BASE_URL,
    element: <App />,
    children: [DemoRoutes, RickRoutes, ChartRoutes, BlogRoutes, SettingsRoutes],
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    loader() {
      return redirect(import.meta.env.BASE_URL);
    },
  },
];

export const router = createBrowserRouter(routes);
