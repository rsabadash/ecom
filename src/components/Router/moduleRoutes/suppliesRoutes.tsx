import { lazy, Suspense } from 'react';
import { routes } from '../../../common/constants/routes';
import { ErrorBoundary } from '../../ErrorBoundary';

const Supplies = lazy(() => import('../../../modules/supplies/Supplies'));
const SupplyAdd = lazy(() => import('../../../modules/supplies/SupplyAdd'));

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
