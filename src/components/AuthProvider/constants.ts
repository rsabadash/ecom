import { AuthContextValue } from './types';

export const CONTEXT_NAME = 'AuthContext';

export const authContextValueDefault: AuthContextValue = {
  signIn: () => Promise.reject(undefined),
  signOut: () => undefined,
  isAuthenticated: false,
};

export const ACCESS_TOKEN_KEY = 'accessToken';

export const REFRESH_TOKEN_KEY = 'refreshToken';
