import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '../../common/constants/routes';

const Dashboard = lazy(() => import('../../modules/dashboard/Dashboard'));
const Categories = lazy(() => import('../../modules/categories/Categories'));
const CategoryAdd = lazy(() => import('../../modules/categories/CategoryAdd'));
const CategoryDetail = lazy(
  () => import('../../modules/categories/CategoryDetail'),
);
const Suppliers = lazy(() => import('../../modules/suppliers/Suppliers'));
const SuppliersDetail = lazy(
  () => import('../../modules/suppliers/SupplierDetail'),
);
const SuppliersAdd = lazy(() => import('../../modules/suppliers/SupplierAdd'));

export const Router = () => {
  return (
    <Routes>
      <Route
        path={routes.home}
        element={<Navigate replace to={routes.dashboard} />}
      />
      <Route
        path={routes.dashboard}
        element={
          <Suspense>
            <Dashboard />
          </Suspense>
        }
      />
      <Route
        path={routes.categories.root}
        element={
          <Suspense>
            <Categories />
          </Suspense>
        }
      />
      <Route
        path={routes.categories.detail}
        element={
          <Suspense>
            <CategoryDetail />
          </Suspense>
        }
      />
      <Route
        path={routes.categories.add}
        element={
          <Suspense>
            <CategoryAdd />
          </Suspense>
        }
      />
      <Route
        path={routes.suppliers.root}
        element={
          <Suspense>
            <Suppliers />
          </Suspense>
        }
      />
      <Route
        path={`${routes.suppliers.detail}`}
        element={
          <Suspense>
            <SuppliersDetail />
          </Suspense>
        }
      />
      <Route
        path={routes.suppliers.add}
        element={
          <Suspense>
            <SuppliersAdd />
          </Suspense>
        }
      />
    </Routes>
  );
};
