import { FC, PropsWithChildren, useMemo } from 'react';

import { endpoints } from '../../common/constants/api';
import { useCachedAPI } from '../../common/hooks';
import { createProvider } from '../../common/utils';
import { useAuth } from '../AuthProvider';
import { CONTEXT_NAME, userContextValueDefault } from './constants';
import { Role } from './enums';
import { User, UserContextValue } from './types';

const [Provider, useUser] = createProvider<UserContextValue>({
  contextName: CONTEXT_NAME,
  contextDefaultValue: userContextValueDefault,
});

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const { data: user } = useCachedAPI<User | undefined>(
    endpoints.users.signIn,
    {
      shouldFetch: isAuthenticated,
    },
  );

  const hasAllAccesses = useMemo<boolean>(
    () => !!user?.roles.find((role) => role === Role.Admin),
    [user],
  );

  const contextValue = useMemo<UserContextValue>(() => {
    return {
      user,
      hasAllAccesses,
    };
  }, [hasAllAccesses, user]);

  return <Provider value={contextValue}>{children}</Provider>;
};

export { UserProvider, useUser };
