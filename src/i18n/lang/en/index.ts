import { categories } from './categories';
import { common } from './common';
import { dashboard } from './dashboard';
import { menu } from './menu';
import { signIn } from './signIn';
import { suppliers } from './suppliers';
import { attributes } from './attributes';
import { warehouseProducts } from './warehouseProducts';
import { pageError } from './pageError';

const translationEN = {
  en: {
    ...categories,
    ...common,
    ...dashboard,
    ...menu,
    ...signIn,
    ...suppliers,
    ...attributes,
    ...warehouseProducts,
    ...pageError,
  },
};

export default translationEN;
