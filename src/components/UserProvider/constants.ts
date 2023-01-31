import { UserContextValue } from './types';

export const CONTEXT_NAME = 'UserContext';

export const userContextValueDefault: UserContextValue = {
  user: undefined,
  hasAllAccesses: false,
};
