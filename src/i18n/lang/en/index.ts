import { categories } from './categories';
import { common } from './common';
import { dashboard } from './dashboard';
import { menu } from './menu';
import { signIn } from './signIn';
import { notFound } from './notFound';
import { suppliers } from './suppliers';
import { supplies } from './supplies';
import { attributes } from './attributes';
import { warehouseProducts } from './warehouseProducts';
import { warehouses } from './warehouses';

const translationEN = {
  en: {
    ...categories,
    ...common,
    ...dashboard,
    ...menu,
    ...notFound,
    ...signIn,
    ...suppliers,
    ...supplies,
    ...attributes,
    ...warehouseProducts,
    ...warehouses,
  },
};

export default translationEN;
