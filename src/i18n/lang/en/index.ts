import { attributes } from './attributes';
import { categories } from './categories';
import { common } from './common';
import { dashboard } from './dashboard';
import { menu } from './menu';
import { notFound } from './notFound';
import { signIn } from './signIn';
import { suppliers } from './suppliers';
import { supplies } from './supplies';
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
