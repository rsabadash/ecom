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
    variantsList: '/attributes/variants',
    variantAdd: '/attributes/:attributeId/variants/add',
    variantDetail: '/attributes/:attributeId/variants/:variantId',
  },
  warehouseProducts: {
    root: '/warehouse-products',
    generate: '/warehouse-products/generate',
  },
  warehouses: {
    root: '/warehouses',
    add: '/warehouses/add',
    detail: '/warehouses/:warehouseId',
  },
};
