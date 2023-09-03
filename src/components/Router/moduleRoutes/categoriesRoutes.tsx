import { lazy, Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ErrorBoundary } from '../../ErrorBoundary';

const Categories = lazy(
  () => import('../../../modules/categories/list/Categories'),
);
const CategoryAdd = lazy(
  () => import('../../../modules/categories/add/CategoryAdd'),
);
const CategoryDetail = lazy(
  () => import('../../../modules/categories/detail/CategoryDetail'),
);

export const categoriesRoutes = [
  {
    path: routes.categories.root,
    element: (
      <Suspense fallback="Route Categories">
        {/*<RoleGuard roles={[Role.ContentManager]}>*/}
        <Categories />
        {/*</RoleGuard>*/}
      </Suspense>
    ),
  },
  {
    path: routes.categories.detail,
    element: (
      <Suspense fallback="Route Categories detail">
        <ErrorBoundary fallback="Error boundary Categories detail">
          <CategoryDetail />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: routes.categories.add,
    element: (
      <Suspense fallback="Route Categories add">
        <ErrorBoundary fallback="Error boundary Categories add">
          <CategoryAdd />
        </ErrorBoundary>
      </Suspense>
    ),
  },
];
