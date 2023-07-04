import { useCallback } from 'react';

import { SessionStorageService } from '../services';

type UseSessionStorageReturn = {
  setSessionStorageItem: <V extends string>(key: string, value: V) => void;
  getSessionStorageItem: <V>(key: string) => V | null;
  removeSessionStorageItem: (key: string) => boolean;
};

export const useSessionStorage = (): UseSessionStorageReturn => {
  const setSessionStorageItem = useCallback(
    <V extends string>(key: string, value: V): void => {
      SessionStorageService.setItem<V>(key, value);
    },
    [],
  );

  const getSessionStorageItem = useCallback(<V>(key: string): V | null => {
    return SessionStorageService.getItem<V>(key);
  }, []);

  const removeSessionStorageItem = useCallback((key: string): boolean => {
    return SessionStorageService.removeItem(key);
  }, []);

  return {
    setSessionStorageItem,
    getSessionStorageItem,
    removeSessionStorageItem,
  };
};
