import {
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { routes } from '../../common/constants/routes';
import {
  useCustomNavigate,
  useLocalStorage,
  useSessionStorage,
} from '../../common/hooks';
import { createProvider } from '../../common/utils';
import { sharedBus } from '../../common/utils/sharedBus';
import {
  ACCESS_TOKEN_KEY,
  authContextValueDefault,
  CONTEXT_NAME,
  PERSIST_USER_KEY,
  REFRESH_TOKEN_KEY,
} from './constants';
import { PERSIST_STATE } from './enums';
import { useSignIn } from './hooks';
import { AuthContextValue, SignInDataExtended } from './types';

const [Provider, useAuth] = createProvider<AuthContextValue>({
  contextName: CONTEXT_NAME,
  contextDefaultValue: authContextValueDefault,
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useCustomNavigate();
  const isSharedBusMethodsRegistered = useRef<boolean>(false);

  const { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } =
    useLocalStorage();

  const {
    setSessionStorageItem,
    getSessionStorageItem,
    removeSessionStorageItem,
  } = useSessionStorage();

  const getStorageItem = useCallback(
    (key: string): string | null => {
      return getLocalStorageItem(key) || getSessionStorageItem(key);
    },
    [getLocalStorageItem, getSessionStorageItem],
  );

  const setStorageItem = useCallback(
    (key: string, value: string, isPersistUser: boolean): void => {
      if (isPersistUser) {
        setLocalStorageItem(key, value);
      } else {
        setSessionStorageItem(key, value);
      }
    },
    [setLocalStorageItem, setSessionStorageItem],
  );

  const removeStorageItem = useCallback(
    (key: string): void => {
      removeLocalStorageItem(key);
      removeSessionStorageItem(key);
    },
    [removeLocalStorageItem, removeSessionStorageItem],
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!getStorageItem(ACCESS_TOKEN_KEY),
  );

  const { signIn } = useSignIn();

  const signInUser = useCallback(
    async (data: SignInDataExtended) => {
      const { isPersistUser, ...restData } = data;
      const response = await signIn(restData);
      const { accessToken, refreshToken } = response || {};

      if (isPersistUser) {
        setLocalStorageItem<PERSIST_STATE>(
          PERSIST_USER_KEY,
          PERSIST_STATE.EXIST,
        );
      }

      // TODO Error handling
      if (accessToken) {
        setStorageItem(ACCESS_TOKEN_KEY, accessToken, isPersistUser);
        setIsAuthenticated(true);
      }

      if (refreshToken) {
        setStorageItem(REFRESH_TOKEN_KEY, refreshToken, isPersistUser);
      }
    },
    [setLocalStorageItem, setStorageItem, signIn],
  );

  const signOutUser = useCallback(() => {
    removeStorageItem(PERSIST_USER_KEY);
    removeStorageItem(ACCESS_TOKEN_KEY);
    removeStorageItem(REFRESH_TOKEN_KEY);
    setIsAuthenticated(false);
  }, [removeStorageItem]);

  const signedInUserRedirect = useCallback((): void => {
    navigate(routes.dashboard.root, { replace: true });
  }, [navigate]);

  // We cannot wrap it in useEffect because one of the methods could be called before useEffect
  if (!isSharedBusMethodsRegistered.current) {
    sharedBus.addMethod('signOut', signOutUser);
    sharedBus.addMethod('signedInRedirect', signedInUserRedirect);

    isSharedBusMethodsRegistered.current = true;
  }

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
