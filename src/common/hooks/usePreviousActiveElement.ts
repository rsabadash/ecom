import { useCallback, useRef } from 'react';

type UsePreviousActiveElementReturn = {
  previousActiveElement: HTMLElement | null;
  savePreviousActiveElement: () => void;
  focusPreviousActiveElement: () => void;
  removePreviousActiveElement: () => void;
};

export const usePreviousActiveElement = (): UsePreviousActiveElementReturn => {
  const previousActiveElement = useRef<null | HTMLElement>(null);

  const savePreviousActiveElement = useCallback((): void => {
    previousActiveElement.current = document.activeElement as HTMLElement;
  }, []);

  const focusPreviousActiveElement = useCallback((): void => {
    previousActiveElement.current?.focus();
  }, []);

  const removePreviousActiveElement = useCallback((): void => {
    previousActiveElement.current = null;
  }, []);

  return {
    previousActiveElement: previousActiveElement.current,
    savePreviousActiveElement,
    focusPreviousActiveElement,
    removePreviousActiveElement,
  };
};
