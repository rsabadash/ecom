import { attributes } from './attributes';
import { categories } from './categories';
import { common } from './common';
import { dashboard } from './dashboard';
import { menu } from './menu';
import { products } from './products';

const translationUK = {
  uk: {
    ...attributes,
    ...categories,
    ...common,
    ...dashboard,
    ...menu,
    ...products,
  },
};

export default translationUK;
