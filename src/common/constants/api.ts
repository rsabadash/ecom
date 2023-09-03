export const API_HOST = 'http://localhost:3001';

export const API = '/api';
export const API_V = '/v1';

const PREFIX = `${API}${API_V}`;

export const endpoints = {
  categories: {
    root: `${PREFIX}/categories`,
  },
  suppliers: {
    root: `${PREFIX}/suppliers`,
  },
  supplies: {
    root: `${PREFIX}/supplies`,
  },
  attributes: {
    root: `${PREFIX}/attributes`,
    getVariants: `${PREFIX}/attributes/:attributeId/variants`,
    variants: `${PREFIX}/attributes/variants`,
  },
  authentication: {
    signIn: `${PREFIX}/authentication/sign-in`,
    refreshToken: `${PREFIX}/authentication/refresh-token`,
  },
  users: {
    verification: `${PREFIX}/users/verification`,
  },
  warehouseProducts: {
    root: `${PREFIX}/warehouses-products`,
  },
  warehouses: {
    root: `${PREFIX}/warehouses`,
  },
};

export const query = {
  category: 'category',
};

export const path = {
  dropdownList: '/dropdown-list',
};
