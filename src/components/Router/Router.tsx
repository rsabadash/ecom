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

const PrivateErrorChildren = (props: unknown) => {
  console.log('PrivateErrorChildren', props);
  return <div>PrivateErrorChildren</div>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        // errorElement: <PrivateError />,
        element: (
          <Suspense>
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
        element: <PublicRoutes />,
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
