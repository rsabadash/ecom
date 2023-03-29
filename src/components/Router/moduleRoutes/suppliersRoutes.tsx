import { lazy, Suspense } from 'react';
import { routes } from '../../../common/constants/routes';
import { ErrorBoundary } from '../../ErrorBoundary';

const Suppliers = lazy(() => import('../../../modules/suppliers/Suppliers'));
const SuppliersDetail = lazy(
  () => import('../../../modules/suppliers/SupplierDetail'),
);
const SuppliersAdd = lazy(
  () => import('../../../modules/suppliers/SupplierAdd'),
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
          <SuppliersDetail />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: routes.suppliers.add,
    element: (
      <Suspense fallback="Route Suppliers add">
        <ErrorBoundary fallback="Error boundary Suppliers add">
          <SuppliersAdd />
        </ErrorBoundary>
      </Suspense>
    ),
  },
];
