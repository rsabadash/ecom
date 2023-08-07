import { PropsWithChildren } from 'react';

import { Role } from '../UserProvider/enums';

export type RoleGuardProps = PropsWithChildren<{
  roles: Role[];
}>;
