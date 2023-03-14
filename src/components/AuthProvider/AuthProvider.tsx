import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createProvider } from '../../utils';
import { AuthContextValue, SignInDataExtended } from './types';
import {
  ACCESS_TOKEN_KEY,
  authContextValueDefault,
  CONTEXT_NAME,
  PERSIST_USER_KEY,
  REFRESH_TOKEN_KEY,
} from './constants';
import { useLocalStorage, useSessionStorage } from '../../hooks';
import { useSignIn } from './hooks';
import { sharedBus } from '../../utils/sharedBus';
import { routes } from '../../common/constants/routes';
import { useNavigate } from 'react-router-dom';
import { PERSIST_STATE } from './enums';

const [Provider, useAuth] = createProvider<AuthContextValue>({
  contextName: CONTEXT_NAME,
  contextDefaultValue: authContextValueDefault,
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const {
    setStorageItem: setLStorageItem,
    getStorageItem: getLStorageItem,
    removeStorageItem: removeLStorageItem,
  } = useLocalStorage();
  const {
    setStorageItem: setSStorageItem,
    getStorageItem: getSStorageItem,
    removeStorageItem: removeSStorageItem,
  } = useSessionStorage();

  const getStorageItem = useCallback(
    (key: string): string | null => {
      return getLStorageItem(key) || getSStorageItem(key);
    },
    [getLStorageItem, getSStorageItem],
  );

  const setStorageItem = useCallback(
    (key: string, value: string, isPersist: boolean): void => {
      if (isPersist) {
        setLStorageItem<PERSIST_STATE>(PERSIST_USER_KEY, PERSIST_STATE.EXIST);
        setLStorageItem(key, value);
      } else {
        setSStorageItem(key, value);
      }
    },
    [setLStorageItem, setSStorageItem],
  );

  const removeStorageItem = useCallback(
    (key: string): void => {
      const persistState = getLStorageItem<PERSIST_STATE>(PERSIST_USER_KEY);

      if (persistState === PERSIST_STATE.EXIST) {
        removeLStorageItem(key);
      } else {
        removeSStorageItem(key);
      }
    },
    [getLStorageItem, removeLStorageItem, removeSStorageItem],
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!getStorageItem(ACCESS_TOKEN_KEY),
  );

  const { signIn } = useSignIn();

  const signInUser = useCallback(
    async (data: SignInDataExtended) => {
      const { rememberUser, ...restData } = data;
      const response = await signIn(restData);
      const { accessToken, refreshToken } = response || {};

      // TODO Error handling
      if (accessToken) {
        setStorageItem(ACCESS_TOKEN_KEY, accessToken, rememberUser);
        setIsAuthenticated(true);
      }

      if (refreshToken) {
        setStorageItem(REFRESH_TOKEN_KEY, refreshToken, rememberUser);
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
    sharedBus.addMethod('signOut', signOutUser);
    sharedBus.addMethod('signedInRedirect', () =>
      navigate(routes.dashboard, { replace: true }),
    );
  }, [signOutUser]);

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
