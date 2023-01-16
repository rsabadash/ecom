import { useCallback, useLayoutEffect, useRef } from 'react';

export type UseOutsideElementClickArgs = {
  dependency: boolean;
  handleClick: () => void;
};

type ReturnType = {
  setCurrentElement: (element: null | HTMLElement) => void;
};

export const useOutsideElementClick = ({
  dependency,
  handleClick,
}: UseOutsideElementClickArgs): ReturnType => {
  const currentElement = useRef<null | HTMLElement>(null);

  const setCurrentElement = useCallback((element: null | HTMLElement): void => {
    currentElement.current = element;
  }, []);

  const handleOutsideClick = useCallback(
    (event: MouseEvent): void => {
      if (
        !currentElement.current ||
        !(currentElement.current instanceof Node)
      ) {
        console.warn('Passed element is not a Node.');
        return;
      }

      if (
        event.target instanceof Node &&
        currentElement.current.contains(event.target)
      ) {
        return;
      }

      if (typeof handleClick !== 'function') {
        console.warn('You should pass callback function.');
        return;
      }

      handleClick();
    },
    [handleClick],
  );

  useLayoutEffect(() => {
    if (dependency) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      if (dependency) {
        document.removeEventListener('click', handleOutsideClick);
      }
    };
  }, [dependency, handleOutsideClick]);

  return {
    setCurrentElement,
  };
};
