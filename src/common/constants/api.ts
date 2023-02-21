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
  authentication: {
    signIn: `${PREFIX}/authentication/sign-in`,
    refreshToken: `${PREFIX}/authentication/refresh-token`,
  },
  users: {
    signIn: `${PREFIX}/users/sign-in`,
  },
  attributes: {
    root: `${PREFIX}/attributes`,
  },
};

export const query = {
  category: 'category',
};

export const path = {
  dropdownList: '/dropdown-list',
};
