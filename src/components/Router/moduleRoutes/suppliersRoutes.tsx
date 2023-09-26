import { lazy, Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ErrorBoundary } from '../../ErrorBoundary';

const Suppliers = lazy(
  () => import('../../../modules/suppliers/list/Suppliers'),
);
const SupplierDetail = lazy(
  () => import('../../../modules/suppliers/detail/SupplierDetail'),
);
const SupplierAdd = lazy(
  () => import('../../../modules/suppliers/add/SupplierAdd'),
);

export const suppliersRoutes = [
  {
    path: routes.suppliers.root,
    element: (
      <Suspense fallback="Route Suppliers">
        {/*<RoleGuard roles={[Role.ContentManager]}>*/}
        <Suppliers />
        {/*</RoleGuard>*/}
      </Suspense>
    ),
  },
  {
    path: routes.suppliers.detail,
    element: (
      <Suspense fallback="Route Suppliers detail">
        <ErrorBoundary fallback="Error boundary Suppliers detail">
          <SupplierDetail />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: routes.suppliers.add,
    element: (
      <Suspense>
        <ErrorBoundary fallback="Error boundary Suppliers add">
          <SupplierAdd />
        </ErrorBoundary>
      </Suspense>
    ),
  },
];
