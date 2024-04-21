import { attributes } from './attributes';
import { categories } from './categories';
import { common } from './common';
import { dashboard } from './dashboard';
import { menu } from './menu';
import { notFound } from './notFound';
import { products } from './products';
import { settings } from './settings';
import { signIn } from './signIn';
import { suppliers } from './suppliers';
import { supplies } from './supplies';
import { warehouses } from './warehouses';

const translationUK = {
  uk: {
    ...attributes,
    ...categories,
    ...common,
    ...dashboard,
    ...menu,
    ...notFound,
    ...products,
    ...settings,
    ...signIn,
    ...suppliers,
    ...supplies,
    ...warehouses,
  },
};

export default translationUK;
