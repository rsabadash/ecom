export const routes = {
  attributes: {
    root: '/attributes',
    add: '/attributes/add',
    detail: '/attributes/:attributeId',
    variantsList: '/attributes/variants',
    variantAdd: '/attributes/:attributeId/variants/add',
    variantDetail: '/attributes/:attributeId/variants/:variantId',
  },
  categories: {
    root: '/categories',
    add: '/categories/add',
    detail: '/categories/:categoryId',
    hierarchy: '/categories/hierarchy',
  },
  dashboard: {
    root: '/dashboard',
  },
  products: {
    root: '/products',
    generate: '/products/generate',
  },
  root: '/',
  settings: {
    root: '/settings',
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
