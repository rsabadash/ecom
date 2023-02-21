import { categories } from './categories';
import { common } from './common';
import { dashboard } from './dashboard';
import { menu } from './menu';
import { signIn } from './signIn';
import { suppliers } from './suppliers';
import { warehouseProducts } from './warehouseProducts';

const translationUK = {
  uk: {
    ...categories,
    ...common,
    ...dashboard,
    ...menu,
    ...signIn,
    ...suppliers,
    ...warehouseProducts,
  },
};

export default translationUK;
