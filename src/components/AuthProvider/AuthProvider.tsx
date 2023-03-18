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
import {
  useCustomNavigate,
  useLocalStorage,
  useSessionStorage,
} from '../../hooks';
import { useSignIn } from './hooks';
import { sharedBus } from '../../utils/sharedBus';
import { routes } from '../../common/constants/routes';
import { PERSIST_STATE } from './enums';

const [Provider, useAuth] = createProvider<AuthContextValue>({
  contextName: CONTEXT_NAME,
  contextDefaultValue: authContextValueDefault,
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useCustomNavigate();
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
        setLocalStorageItem<PERSIST_STATE>(
          PERSIST_USER_KEY,
          PERSIST_STATE.EXIST,
        );
        setLocalStorageItem(key, value);
      } else {
        setSessionStorageItem(key, value);
      }
    },
    [setLocalStorageItem, setSessionStorageItem],
  );

  const removeStorageItem = useCallback(
    (key: string): void => {
      const persistState = getLocalStorageItem<PERSIST_STATE>(PERSIST_USER_KEY);

      if (persistState === PERSIST_STATE.EXIST) {
        removeLocalStorageItem(key);
      } else {
        removeSessionStorageItem(key);
      }
    },
    [getLocalStorageItem, removeLocalStorageItem, removeSessionStorageItem],
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!getStorageItem(ACCESS_TOKEN_KEY),
  );

  const { signIn } = useSignIn();

  const signInUser = useCallback(
    async (data: SignInDataExtended) => {
      const { isPersistUser, ...restData } = data;
      const response = await signIn(restData);
      const { accessToken, refreshToken } = response || {};

      // TODO Error handling
      if (accessToken) {
        setStorageItem(ACCESS_TOKEN_KEY, accessToken, isPersistUser);
        setIsAuthenticated(true);
      }

      if (refreshToken) {
        setStorageItem(REFRESH_TOKEN_KEY, refreshToken, isPersistUser);
      }
    },
    [setStorageItem, signIn],
  );

  const signOutUser = useCallback(() => {
    removeStorageItem(PERSIST_USER_KEY);
    removeStorageItem(ACCESS_TOKEN_KEY);
    removeStorageItem(REFRESH_TOKEN_KEY);
    setIsAuthenticated(false);
  }, [removeStorageItem]);

  useEffect(() => {
    sharedBus.addMethod('signOut', signOutUser);
    sharedBus.addMethod('signedInRedirect', () =>
      navigate(routes.dashboard, { replace: true }),
    );
  }, [navigate, signOutUser]);

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
