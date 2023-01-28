import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createProvider } from '../../utils';
import { AuthContextValue, SignInData } from './types';
import {
  ACCESS_TOKEN_KEY,
  authContextValueDefault,
  CONTEXT_NAME,
  REFRESH_TOKEN_KEY,
} from './constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useSignIn } from './hooks';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../common/constants/routes';

const [Provider, useAuth] = createProvider<AuthContextValue>({
  contextName: CONTEXT_NAME,
  contextDefaultValue: authContextValueDefault,
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { setStorageItem, getStorageItem, removeStorageItem } =
    useLocalStorage();

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!getStorageItem(ACCESS_TOKEN_KEY),
  );

  const { signIn } = useSignIn();

  const signInUser = useCallback(
    async (data: SignInData) => {
      const response = await signIn(data);
      const { accessToken, refreshToken } = response || {};
      // TODO Error handling
      if (accessToken && refreshToken) {
        setStorageItem(ACCESS_TOKEN_KEY, accessToken);
        setStorageItem(REFRESH_TOKEN_KEY, refreshToken);
        setIsAuthenticated(true);
      }
    },
    [setStorageItem, signIn],
  );

  const signOutUser = useCallback(() => {
    removeStorageItem(ACCESS_TOKEN_KEY);
    removeStorageItem(REFRESH_TOKEN_KEY);
    setIsAuthenticated(false);
  }, [removeStorageItem]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.signIn, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const contextValue = useMemo<AuthContextValue>(() => {
    return {
      signIn: signInUser,
      signOut: signOutUser,
      isAuthenticated,
    };
  }, [isAuthenticated, signInUser, signOutUser]);

  return <Provider value={contextValue}>{children}</Provider>;
};

export { AuthProvider, useAuth };
