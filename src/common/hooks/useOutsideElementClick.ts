import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { EventKeys } from '../enums/events';

type HandleClickCallback = () => void;

type UseOutsideElementClickProps = {
  ref: MutableRefObject<HTMLElement | null>;
  dependency: boolean;
  listenKeyboard?: boolean;
  listenInteraction?: boolean;
  handleClick: HandleClickCallback;
};

export const useOutsideElementClick = ({
  ref,
  dependency,
  listenKeyboard,
  listenInteraction,
  handleClick,
}: UseOutsideElementClickProps): void => {
  const handleClickRef = useRef<HandleClickCallback>(handleClick);

  const handleOutsideAction = useCallback(
    (event: MouseEvent | TouchEvent): void => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        event.stopPropagation();
        handleClickRef.current();
      }
    },
    [ref],
  );

  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    const key = event.key as EventKeys;

    if (key === EventKeys.Escape) {
      event.stopPropagation();
      handleClickRef.current();
    }
  }, []);

  useEffect(() => {
    if (dependency) {
      if (listenInteraction) {
        document.addEventListener('click', handleOutsideAction, true);
        document.addEventListener('touchend', handleOutsideAction, true);
      }

      if (listenKeyboard) {
        document.addEventListener('keydown', handleKeyDown, true);
      }
    }

    return () => {
      if (dependency) {
        if (listenInteraction) {
          document.removeEventListener('click', handleOutsideAction, true);
          document.removeEventListener('touchend', handleOutsideAction, true);
        }

        if (listenKeyboard) {
          document.removeEventListener('keydown', handleKeyDown, true);
        }
      }
    };
  }, [
    dependency,
    handleKeyDown,
    handleOutsideAction,
    listenInteraction,
    listenKeyboard,
  ]);
};
