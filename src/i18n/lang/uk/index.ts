import { categories } from './categories';
import { common } from './common';
import { dashboard } from './dashboard';
import { menu } from './menu';
import { notFound } from './notFound';
import { signIn } from './signIn';
import { suppliers } from './suppliers';
import { attributes } from './attributes';
import { warehouseProducts } from './warehouseProducts';

const translationUK = {
  uk: {
    ...categories,
    ...common,
    ...dashboard,
    ...menu,
    ...notFound,
    ...signIn,
    ...suppliers,
    ...attributes,
    ...warehouseProducts,
  },
};

export default translationUK;
