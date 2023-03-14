import { useCallback } from 'react';
import { SessionStorageService } from '../services';

type UseSessionStorageReturn = {
  setStorageItem: <V extends string>(key: string, value: V) => void;
  getStorageItem: <V>(key: string) => V | null;
  removeStorageItem: (key: string) => boolean;
};

export const useSessionStorage = (): UseSessionStorageReturn => {
  const setStorageItem = useCallback(
    <V extends string>(key: string, value: V): void => {
      SessionStorageService.setItem<V>(key, value);
    },
    [],
  );

  const getStorageItem = useCallback(<V>(key: string): V | null => {
    return SessionStorageService.getItem<V>(key);
  }, []);

  const removeStorageItem = useCallback((key: string): boolean => {
    return SessionStorageService.removeItem(key);
  }, []);

  return {
    setStorageItem,
    getStorageItem,
    removeStorageItem,
  };
};
