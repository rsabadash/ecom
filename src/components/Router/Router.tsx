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
import Attributes from '../../modules/attributes/list/Attributes';
import AttributeAdd from '../../modules/attributes/list/AttributeAdd';
import AttributeDetail from '../../modules/attributes/detail/AttributeDetail';
import AttributeVariantDetail from '../../modules/attributes/detail/AttributeVariantDetail';
import AttributeVariantAdd from '../../modules/attributes/detail/AttributeVariantAdd';
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
          element={
            <Suspense fallback="Route Categories detail">
              <CategoryDetail />
            </Suspense>
          }
        />
        <Route
          path={routes.categories.add}
          element={
            <Suspense fallback="Route Categories add">
              <CategoryAdd />
            </Suspense>
          }
        />
        <Route
          path={routes.suppliers.root}
          element={
            <Suspense fallback="Route Suppliers">
              <Suppliers />
            </Suspense>
          }
        />
        <Route
          path={`${routes.suppliers.detail}`}
          element={
            <Suspense fallback="Route Suppliers detail">
              <SuppliersDetail />
            </Suspense>
          }
        />
        <Route
          path={routes.suppliers.add}
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
          element={
            <Suspense fallback="Route Attribute add">
              <AttributeAdd />
            </Suspense>
          }
        />
        <Route
          path={routes.attributes.detail}
          element={
            <Suspense fallback="Route Attribute detail">
              <AttributeDetail />
            </Suspense>
          }
        />
        <Route
          path={routes.attributes.variantAdd}
          element={
            <Suspense fallback="Route Attribute variant add detail">
              <AttributeVariantAdd />
            </Suspense>
          }
        />
        <Route
          path={routes.attributes.variantDetail}
          element={
            <Suspense fallback="Route Attribute variant detail">
              <AttributeVariantDetail />
            </Suspense>
          }
        />
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
