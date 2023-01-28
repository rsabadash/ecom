import { FC, PropsWithChildren, useMemo } from 'react';
import { createProvider } from '../../utils';
import { User, UserContextValue } from './types';
import { userContextValueDefault, CONTEXT_NAME } from './constants';
import { useCachedAPI } from '../../hooks';
import { endpoints } from '../../common/constants/api';
import { useAuth } from '../AuthProvider';

const [Provider, useUser] = createProvider<UserContextValue>({
  contextName: CONTEXT_NAME,
  contextDefaultValue: userContextValueDefault,
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2M3MTg0MTA0NjE4NmNmYWJmYTZhODkiLCJpYXQiOjE2NzQ4MzEzNzgsImV4cCI6MTY3NDgzMTQxNCwiYXVkIjoibG9jYWxob3N0OjMwMDAiLCJpc3MiOiJsb2NhbGhvc3Q6MzAwMSJ9.LTNYOwQNLYOBVhx2lta19rQVyx7MlA0ZgIqC05iqttA
const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const { data: user } = useCachedAPI<User | undefined>(
    endpoints.users.signIn,
    {
      shouldFetch: isAuthenticated,
    },
  );

  const contextValue = useMemo<UserContextValue>(() => {
    return {
      user,
    };
  }, [user]);

  return <Provider value={contextValue}>{children}</Provider>;
};

export { UserProvider, useUser };
