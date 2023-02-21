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
    variantDetail: '/attributes/variants/:variantId',
    variantAdd: '/attributes/:attributeId/variant/add',
    //to discuss
    variantDetailPath: '/attributes/variants',
    variantAddPath: 'variant/add',
  },
};
