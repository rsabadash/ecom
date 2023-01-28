import { useCallback } from 'react';
import { LocalStorageService } from '../services';

type UseLocalStorage = () => {
  setStorageItem: <V extends string>(key: string, value: V) => void;
  getStorageItem: <V>(key: string) => V | null;
  removeStorageItem: (key: string) => void;
};

export const useLocalStorage: UseLocalStorage = () => {
  const setStorageItem = useCallback(
    <V extends string>(key: string, value: V): void => {
      LocalStorageService.setItem<V>(key, value);
    },
    [],
  );

  const getStorageItem = useCallback(<V>(key: string): V | null => {
    return LocalStorageService.getItem<V>(key);
  }, []);

  const removeStorageItem = useCallback((key: string): void => {
    LocalStorageService.removeItem(key);
  }, []);

  return {
    setStorageItem,
    getStorageItem,
    removeStorageItem,
  };
};
