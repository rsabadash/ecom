import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from '../../common/constants/routes';
import { Root } from '../../layouts/Root';
import {
  attributesRoutes,
  categoriesRoutes,
  dashboardRoutes,
  suppliersRoutes,
  suppliesRoutes,
  warehouseProductsRoutes,
  warehousesRoutes,
} from './moduleRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { SignedInRedirect } from './SignedInRedirect';

const SignIn = lazy(() => import('../../pages/signIn/SignIn'));
const NotFound = lazy(() => import('../../pages/notFound/NotFound'));

const PrivateError = (props: unknown) => {
  console.log('PrivateError', props);
  return <div>PrivateError</div>;
};

const PrivateErrorChildren = (props: unknown) => {
  console.log('PrivateErrorChildren', props);
  return <div>PrivateErrorChildren</div>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback="Route Root">
        <Root />
      </Suspense>
    ),
    children: [
      {
        errorElement: <PrivateError />,
        element: (
          <Suspense fallback="Route Private">
            <PrivateRoutes />
          </Suspense>
        ),
        children: [
          {
            path: routes.home,
            element: <SignedInRedirect />,
          },
          ...attributesRoutes,
          ...categoriesRoutes,
          ...dashboardRoutes,
          ...suppliersRoutes,
          ...suppliesRoutes,
          ...warehouseProductsRoutes,
          ...warehousesRoutes,
          {
            path: '*',
            element: <PrivateErrorChildren />,
          },
        ],
      },
      {
        element: (
          <Suspense fallback="Rout Public">
            <PublicRoutes />
          </Suspense>
        ),
        children: [
          {
            path: routes.signIn,
            element: (
              <Suspense fallback="Route Sign in">
                <SignIn />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} fallbackElement={'ROUTER FALLBACK'} />;
};
