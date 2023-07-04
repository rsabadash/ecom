import { FC, PropsWithChildren, useMemo } from 'react';

import { SignedInRedirect } from '../Router/SignedInRedirect';
import { useUser } from '../UserProvider';
import { RoleGuardProps } from './types';

export const RoleGuard: FC<PropsWithChildren<RoleGuardProps>> = ({
  children,
  roles,
}) => {
  const { user, hasAllAccesses } = useUser();

  const hasAccess = useMemo(() => {
    return (
      hasAllAccesses || user?.roles.some((userRole) => roles.includes(userRole))
    );
  }, [hasAllAccesses, roles, user?.roles]);

  return hasAccess ? <>{children}</> : <SignedInRedirect />;
};
