export const routes = {
  signIn: '/sign-in',
  home: '/',
  dashboard: '/dashboard',
  categories: {
    root: '/categories',
    add: '/categories/add',
    detail: '/categories/:categoryId',
  },
  suppliers: {
    root: '/suppliers',
    add: '/suppliers/add',
    detail: '/suppliers/:supplierId',
  },
  attributes: {
    root: '/attributes',
    add: '/attributes/add',
    detail: '/attributes/:attributeId',
    variantAdd: '/attributes/:attributeId/variants/add',
    variantDetail: '/attributes/:attributeId/variants/:variantId',
  },
};
