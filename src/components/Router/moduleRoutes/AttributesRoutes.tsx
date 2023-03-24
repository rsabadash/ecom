import { routes } from '../../../common/constants/routes';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '../../ErrorBoundary';

const Attributes = lazy(
  () => import('../../../modules/attributes/attributes/Attributes'),
);
const AttributeAdd = lazy(
  () => import('../../../modules/attributes/attributes/AttributeAdd'),
);
const AttributeDetail = lazy(
  () => import('../../../modules/attributes/attributes/AttributeDetail'),
);
const Variants = lazy(
  () => import('../../../modules/attributes/variants/Variants'),
);
const VariantAdd = lazy(
  () => import('../../../modules/attributes/variants/VariantAdd'),
);
const VariantDetail = lazy(
  () => import('../../../modules/attributes/variants/VariantDetail'),
);

export const AttributesRoutes = [
  {
    path: routes.attributes.root,
    element: (
      <Suspense fallback="Route Attributes">
        <Attributes />
      </Suspense>
    ),
  },
  {
    path: routes.attributes.add,
    element: (
      <Suspense fallback="Route Attribute add">
        <ErrorBoundary fallback="Error boundary Attribute add">
          <AttributeAdd />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: routes.attributes.detail,
    element: (
      <Suspense fallback="Route Attribute detail">
        <ErrorBoundary fallback="Error boundary Attribute detail">
          <AttributeDetail />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: routes.attributes.variantsList,
    element: (
      <Suspense fallback="Route Variants list">
        <Variants />
      </Suspense>
    ),
  },
  {
    path: routes.attributes.variantAdd,
    element: (
      <Suspense fallback="Route Attribute variant add detail">
        <ErrorBoundary fallback="Error boundary Warehouse product generator">
          <VariantAdd />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: routes.attributes.variantDetail,
    element: (
      <Suspense fallback="Route Attribute variant detail">
        <ErrorBoundary fallback="Error boundary Variant detail">
          <VariantDetail />
        </ErrorBoundary>
      </Suspense>
    ),
  },
];
