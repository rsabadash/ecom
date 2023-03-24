import { routes } from '../../../common/constants/routes';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '../../ErrorBoundary';

const WarehouseProducts = lazy(
  () => import('../../../modules/warehouseProducts/list/WarehouseProducts'),
);
const WarehouseProductsGenerator = lazy(
  () =>
    import(
      '../../../modules/warehouseProducts/generator/WarehouseProductsGenerator'
    ),
);

export const WarehouseProductsRoutes = [
  {
    path: routes.warehouseProducts.root,
    element: (
      <Suspense fallback="Route Warehouse products">
        <WarehouseProducts />
      </Suspense>
    ),
  },
  {
    path: routes.warehouseProducts.generate,
    element: (
      <Suspense fallback="Route Warehouse products generator">
        <ErrorBoundary fallback="Error boundary Warehouse product generator">
          <WarehouseProductsGenerator />
        </ErrorBoundary>
      </Suspense>
    ),
  },
];
