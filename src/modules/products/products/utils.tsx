import { lazy } from 'react';
import { MapCategoryToComponent, Product } from './types';

const ComicsCategory = lazy(() => import('../categories/Comics'));

export const mapCategoryToComponent = (props?: {
  formData: Product;
  isReadOnly: boolean;
}): MapCategoryToComponent => {
  return {
    comics: <ComicsCategory {...props} />,
  };
};
