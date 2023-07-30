import { lazy, Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ErrorBoundary } from '../../ErrorBoundary';

const Supplies = lazy(() => import('../../../modules/supplies/list/Supplies'));
const SupplyDetail = lazy(
  () => import('../../../modules/supplies/detail/SupplyDetail'),
);
const SupplyAdd = lazy(() => import('../../../modules/supplies/add/SupplyAdd'));

export const suppliesRoutes = [
  {
    path: routes.supplies.root,
    element: (
      <Suspense fallback="Route Suppliers">
        <Supplies />
      </Suspense>
    ),
  },
  {
    path: routes.supplies.detail,
    element: (
      <Suspense fallback="Route Supply detail">
        <ErrorBoundary fallback="Error boundary Supply detail">
          <SupplyDetail />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: routes.supplies.add,
    element: (
      <Suspense fallback="Route Supply add">
        <ErrorBoundary fallback="Error boundary Supply add">
          <SupplyAdd />
        </ErrorBoundary>
      </Suspense>
    ),
  },
];
