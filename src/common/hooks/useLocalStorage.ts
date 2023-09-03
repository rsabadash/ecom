import { useCallback } from 'react';

import { LocalStorageService } from '../services';

type UseLocalStorageReturn = {
  setLocalStorageItem: <V extends string>(key: string, value: V) => void;
  getLocalStorageItem: <V>(key: string) => V | null;
  removeLocalStorageItem: (key: string) => boolean;
};

export const useLocalStorage = (): UseLocalStorageReturn => {
  const setLocalStorageItem = useCallback(
    <V extends string>(key: string, value: V): void => {
      LocalStorageService.setItem<V>(key, value);
    },
    [],
  );

  const getLocalStorageItem = useCallback(<V>(key: string): V | null => {
    return LocalStorageService.getItem<V>(key);
  }, []);

  const removeLocalStorageItem = useCallback((key: string): boolean => {
    return LocalStorageService.removeItem(key);
  }, []);

  return {
    setLocalStorageItem,
    getLocalStorageItem,
    removeLocalStorageItem,
  };
};
