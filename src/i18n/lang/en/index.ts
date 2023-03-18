import { categories } from './categories';
import { common } from './common';
import { dashboard } from './dashboard';
import { menu } from './menu';
import { pageError } from './pageError';
import { signIn } from './signIn';
import { suppliers } from './suppliers';
import { attributes } from './attributes';
import { warehouseProducts } from './warehouseProducts';
import { warehouses } from './warehouses';

const translationEN = {
  en: {
    ...categories,
    ...common,
    ...dashboard,
    ...menu,
    ...pageError,
    ...signIn,
    ...suppliers,
    ...attributes,
    ...warehouseProducts,
    ...warehouses,
  },
};

export default translationEN;
