import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '../../common/constants/routes';

const Dashboard = lazy(() => import('../../modules/dashboard'));
const Categories = lazy(() => import('../../modules/categories/Categories'));
const CategoryAdd = lazy(() => import('../../modules/categories/CategoryAdd'));
const CategoryDetail = lazy(
  () => import('../../modules/categories/CategoryDetail'),
);
const Suppliers = lazy(() => import('../../modules/suppliers/Suppliers'));
const SuppliersDetail = lazy(() => import('../../modules/suppliers/SuppliersDetail'));
const SuppliersAdd = lazy(() => import('../../modules/suppliers/SuppliersAdd'));
// const Products = lazy(() => import('../../modules/products/products'));
// const ProductsAdd = lazy(() => import('../../modules/products/products/ProductsAdd'));
// const ProductDetail = lazy(() => import('../../modules/products/products/ProductDetail'));

const Router = () => {
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
        path={routes.categories}
        element={
          <Suspense>
            <Categories />
          </Suspense>
        }
      />
      <Route
        path={`${routes.categories}/:categoryId`}
        element={
          <Suspense>
            <CategoryDetail />
          </Suspense>
        }
      />
      <Route
        path={routes.categoriesAdd}
        element={
          <Suspense>
            <CategoryAdd />
          </Suspense>
        }
      />
        <Route path={routes.suppliers.root} element={(
            <Suspense>
                <Suppliers />
            </Suspense>
        )}/>
        <Route path={`${routes.suppliers}/:supplierId`} element={(
            <Suspense><SuppliersDetail /></Suspense>
        )}/>
        <Route path={routes.suppliers.add} element={(
            <Suspense><SuppliersAdd /></Suspense>
        )}/>
      {/*<Route path={routes.products} element={(*/}
      {/*    <Suspense><Products /></Suspense>*/}
      {/*)}/>*/}
      {/*<Route path={`${routes.products}/:productId`} element={(*/}
      {/*    <Suspense><ProductDetail /></Suspense>*/}
      {/*)}/>*/}
      {/*<Route path={routes.productsAdd} element={(*/}
      {/*    <Suspense><ProductsAdd /></Suspense>*/}
      {/*)}/>*/}
    </Routes>
  );
};

export { Router };
