import { categories } from './categories';
import { common } from './common';
import { dashboard } from './dashboard';
import { menu } from './menu';
import { signIn } from './signIn';
import { suppliers } from './suppliers';

const translationEN = {
  en: {
    ...categories,
    ...common,
    ...dashboard,
    ...menu,
    ...signIn,
    ...suppliers,
  },
};

export default translationEN;
