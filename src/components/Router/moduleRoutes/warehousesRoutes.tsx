import { lazy, Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ErrorBoundary } from '../../ErrorBoundary';

const Warehouses = lazy(
  () => import('../../../modules/warehouses/list/Warehouses'),
);
const WarehouseAdd = lazy(
  () => import('../../../modules/warehouses/add/WarehouseAdd'),
);
const WarehouseDetail = lazy(
  () => import('../../../modules/warehouses/detail/WarehouseDetail'),
);

export const warehousesRoutes = [
  {
    path: routes.warehouses.root,
    element: (
      <Suspense fallback="Route Warehouses list">
        <Warehouses />
      </Suspense>
    ),
  },
  {
    path: routes.warehouses.add,
    element: (
      <Suspense fallback="Route Warehouses add">
        <ErrorBoundary fallback="Error boundary Warehouse add">
          <WarehouseAdd />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: routes.warehouses.detail,
    element: (
      <Suspense fallback="Route Warehouses detail">
        <ErrorBoundary fallback="Error boundary Warehouse detail">
          <WarehouseDetail />
        </ErrorBoundary>
      </Suspense>
    ),
  },
];
