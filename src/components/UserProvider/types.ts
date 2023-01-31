import { Role } from './enums';

export type User = {
  _id: string;
  email: string;
  roles: Role[];
};

export type UserContextValue = {
  user: User | undefined;
  hasAllAccesses: boolean;
};
