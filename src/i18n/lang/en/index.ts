import { attributes } from './attributes';
import { categories } from './categories';
import { common } from './common';
import { dashboard } from './dashboard';
import { menu } from './menu';
import { notFound } from './notFound';
import { products } from './products';
import { signIn } from './signIn';
import { suppliers } from './suppliers';
import { supplies } from './supplies';
import { warehouses } from './warehouses';

const translationEN = {
  en: {
    ...attributes,
    ...categories,
    ...common,
    ...dashboard,
    ...menu,
    ...notFound,
    ...products,
    ...signIn,
    ...suppliers,
    ...supplies,
    ...warehouses,
  },
};

export default translationEN;
