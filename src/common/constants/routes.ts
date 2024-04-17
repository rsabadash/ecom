export const routes = {
  home: '/',
  attributes: {
    root: '/attributes',
    add: '/attributes/add',
    detail: '/attributes/:attributeId',
    variantsList: '/attributes/variants',
    variantAdd: '/attributes/:attributeId/variants/add',
    variantDetail: '/attributes/:attributeId/variants/:variantId',
  },
  dashboard: '/dashboard',
  categories: {
    root: '/categories',
    add: '/categories/add',
    detail: '/categories/:categoryId',
    hierarchy: '/categories/hierarchy',
  },
  products: {
    root: '/products',
    generate: '/products/generate',
  },
  signIn: '/sign-in',
  suppliers: {
    root: '/suppliers',
    add: '/suppliers/add',
    detail: '/suppliers/:supplierId',
  },
  supplies: {
    root: '/supplies',
    add: '/supplies/add',
    detail: '/supplies/:supplyId',
  },
  warehouses: {
    root: '/warehouses',
    add: '/warehouses/add',
    detail: '/warehouses/:warehouseId',
  },
};
