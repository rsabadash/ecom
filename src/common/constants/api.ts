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
  attributes: {
    root: `${PREFIX}/attributes`,
    variants: `${PREFIX}/attributes/variants`,
  },
  authentication: {
    signIn: `${PREFIX}/authentication/sign-in`,
    refreshToken: `${PREFIX}/authentication/refresh-token`,
  },
  users: {
    signIn: `${PREFIX}/users/sign-in`,
  },
  warehouseProducts: {
    root: `${PREFIX}/warehouse-products`,
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
