import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { routes } from '../../common/constants/routes';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { Root } from '../../layouts/Root';
import { SignedInRedirect } from './SignedInRedirect';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';

// import { RoleGuard } from '../RoleGuard';
// import { Role } from '../UserProvider/enums';

const SignIn = lazy(() => import('../../pages/signIn/SignIn'));
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
const Attributes = lazy(
  () => import('../../modules/attributes/attributes/Attributes'),
);
const AttributeAdd = lazy(
  () => import('../../modules/attributes/attributes/AttributeAdd'),
);
const AttributeDetail = lazy(
  () => import('../../modules/attributes/attributes/AttributeDetail'),
);
const Variants = lazy(
  () => import('../../modules/attributes/variants/Variants'),
);
const VariantAdd = lazy(
  () => import('../../modules/attributes/variants/VariantAdd'),
);
const VariantDetail = lazy(
  () => import('../../modules/attributes/variants/VariantDetail'),
);
const WarehouseProducts = lazy(
  () => import('../../modules/warehouseProducts/list/WarehouseProducts'),
);
const WarehouseProductsGenerator = lazy(
  () =>
    import(
      '../../modules/warehouseProducts/generator/WarehouseProductsGenerator'
    ),
);
const Warehouses = lazy(() => import('../../modules/warehouses/Warehouses'));
const WarehouseAdd = lazy(
  () => import('../../modules/warehouses/WarehouseAdd'),
);
const WarehouseDetail = lazy(
  () => import('../../modules/warehouses/WarehouseDetail'),
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback="Route Root">
          <Root />
        </Suspense>
      }
    >
      <Route
        element={
          <Suspense fallback="Route Private">
            <PrivateRoutes />
          </Suspense>
        }
      >
        <Route path={routes.home} element={<SignedInRedirect />} />
        <Route
          path={routes.dashboard}
          errorElement={<ErrorPage />}
          element={
            <Suspense fallback="Route Dashboard">
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path={routes.categories.root}
          element={
            <Suspense fallback="Route Categories">
              {/*<RoleGuard roles={[Role.ContentManager]}>*/}
              <Categories />
              {/*</RoleGuard>*/}
            </Suspense>
          }
        />
        <Route
          path={routes.categories.detail}
          errorElement={<ErrorPage />}
          element={
            <Suspense fallback="Route Categories detail">
              <CategoryDetail />
            </Suspense>
          }
        />
        <Route
          path={routes.categories.add}
          errorElement={<ErrorPage />}
          element={
            <Suspense fallback="Route Categories add">
              <CategoryAdd />
            </Suspense>
          }
        />
        <Route
          path={routes.suppliers.root}
          errorElement={<ErrorPage />}
          element={
            <Suspense fallback="Route Suppliers">
              <Suppliers />
            </Suspense>
          }
        />
        <Route
          path={`${routes.suppliers.detail}`}
          errorElement={<ErrorPage />}
          element={
            <Suspense fallback="Route Suppliers detail">
              <SuppliersDetail />
            </Suspense>
          }
        />
        <Route
          path={routes.suppliers.add}
          errorElement={<ErrorPage />}
          element={
            <Suspense fallback="Route Suppliers add">
              <SuppliersAdd />
            </Suspense>
          }
        />
        <Route
          path={routes.attributes.root}
          element={
            <Suspense fallback="Route Attributes">
              <Attributes />
            </Suspense>
          }
        />
        <Route
          path={routes.attributes.add}
          errorElement={<ErrorPage />}
          element={
            <Suspense fallback="Route Attribute add">
              <AttributeAdd />
            </Suspense>
          }
        />
        <Route
          path={routes.attributes.detail}
          errorElement={<ErrorPage />}
          element={
            <Suspense fallback="Route Attribute detail">
              <AttributeDetail />
            </Suspense>
          }
        />
        <Route
          path={routes.attributes.variantsList}
          errorElement={<ErrorPage />}
          element={
            <Suspense fallback="Route Variants list">
              <Variants />
            </Suspense>
          }
        />
        <Route
          path={routes.attributes.variantAdd}
          errorElement={<ErrorPage />}
          element={
            <Suspense fallback="Route Attribute variant add detail">
              <VariantAdd />
            </Suspense>
          }
        />
        <Route
          path={routes.attributes.variantDetail}
          errorElement={<ErrorPage />}
          element={
            <Suspense fallback="Route Attribute variant detail">
              <VariantDetail />
            </Suspense>
          }
        />
        <Route
          path={routes.warehouseProducts.root}
          element={
            <Suspense fallback="Route Warehouse products">
              <WarehouseProducts />
            </Suspense>
          }
        />
        <Route
          path={routes.warehouseProducts.generate}
          element={
            <Suspense fallback="Route Warehouse products generator">
              <WarehouseProductsGenerator />
            </Suspense>
          }
        />
        <Route
          path={routes.warehouses.root}
          element={
            <Suspense fallback="Route Warehouses list">
              <Warehouses />
            </Suspense>
          }
        />
        <Route
          path={routes.warehouses.add}
          element={
            <Suspense fallback="Route Warehouses add">
              <WarehouseAdd />
            </Suspense>
          }
        />
        <Route
          path={routes.warehouses.detail}
          element={
            <Suspense fallback="Route Warehouses detail">
              <WarehouseDetail />
            </Suspense>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route
        element={
          <Suspense fallback="Rout Public">
            <PublicRoutes />
          </Suspense>
        }
      >
        <Route
          path={routes.signIn}
          element={
            <Suspense fallback="Route Sign in">
              <SignIn />
            </Suspense>
          }
        />
      </Route>
    </Route>,
  ),
);

export const Router = () => {
  return <RouterProvider router={router} fallbackElement={'ROUTER FALLBACK'} />;
};
