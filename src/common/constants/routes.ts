export const routes = {
  home: '/',
  dashboard: '/dashboard',

  categories: {
    root: '/categories',
    add: '/categories/add',
    detail: '/categories/:categoryId',
  },

  products: {
    root: '/products',
    add: '/products/add',
  },
  suppliers: {
    root: '/suppliers',
    add: '/suppliers/add',
    detail: '/suppliers/:supplierId',
  },
};
