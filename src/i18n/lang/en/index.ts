import { attributes } from './attributes';
import { categories } from './categories';
import { common } from './common';
import { dashboard } from './dashboard';
import { menu } from './menu';
import { products } from './products';
import { suppliers } from './suppliers';

const translationEN = {
  en: {
    ...attributes,
    ...categories,
    ...common,
    ...dashboard,
    ...menu,
    ...products,
    ...suppliers,
  },
};

export default translationEN;
