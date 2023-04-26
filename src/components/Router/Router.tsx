import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../../common/constants/routes';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { Root } from '../../layouts/Root';
import { SignedInRedirect } from './SignedInRedirect';
import {
  attributesRoutes,
  categoriesRoutes,
  dashboardRoutes,
  suppliersRoutes,
  suppliesRoutes,
  warehouseProductsRoutes,
  warehousesRoutes,
} from './moduleRoutes';

const SignIn = lazy(() => import('../../pages/signIn/SignIn'));
const NotFound = lazy(() => import('../../pages/notFound/NotFound'));

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
        errorElement: <NotFound />,
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
