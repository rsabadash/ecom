import { lazy, Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ErrorBoundary } from '../../ErrorBoundary';

const Products = lazy(() => import('../../../modules/products/list/Products'));
const ProductsGenerator = lazy(
  () => import('../../../modules/products/generator/ProductsGenerator'),
);

export const productsRoutes = [
  {
    path: routes.products.root,
    element: (
      <Suspense fallback="Route Warehouse products">
        <Products />
      </Suspense>
    ),
  },
  {
    path: routes.products.generate,
    element: (
      <Suspense fallback="Route Products generator">
        <ErrorBoundary fallback="Error boundary Product generator">
          <ProductsGenerator />
        </ErrorBoundary>
      </Suspense>
    ),
  },
];
