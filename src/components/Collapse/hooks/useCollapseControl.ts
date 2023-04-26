import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { CollapseControllerProps } from '../types';

type UseCollapseControlProps = Omit<
  CollapseControllerProps,
  | 'ariaLabel'
  | 'ariaControls'
  | 'isToggleHidden'
  | 'bodyClassName'
  | 'headerClassName'
>;

type UseCollapseControlReturn = {
  isExpand: boolean;
  toggleCollapse: () => void;
  isOnceExpanded: boolean;
};

export const useCollapseControl = ({
  forceExpand,
  isInitiallyExpand,
  onExpandFinished,
  onCollapseFinished,
  collapseBodyRef,
}: UseCollapseControlProps): UseCollapseControlReturn => {
  const [isExpand, setIsExpand] = useState<boolean>(() => !!isInitiallyExpand);
  const isOnceExpandedRef = useRef<boolean>(false);
  // To prevent bug when the transition delay has not ended but user collapse the body
  const isTransitioningRef = useRef<boolean>(false);

  const expandFinishedCallback = useCallback(() => {
    if (!isOnceExpandedRef.current) {
      isOnceExpandedRef.current = true;
    }

    onExpandFinished && onExpandFinished();
    if (collapseBodyRef.current) {
      collapseBodyRef.current.style.overflow = 'unset';
      // set "auto" because if we leave a defined height it can break the styles
      // in case our height of collapse dynamically was changed some parts of the component can be overlapped
      collapseBodyRef.current.style.height = 'auto';

      isTransitioningRef.current = false;

      collapseBodyRef.current.removeEventListener(
        'transitionend',
        expandFinishedCallback,
      );
    }
  }, [collapseBodyRef, onExpandFinished]);

  const collapseFinishedCallback = useCallback(() => {
    onCollapseFinished && onCollapseFinished();

    if (collapseBodyRef.current) {
      isTransitioningRef.current = false;

      collapseBodyRef.current.removeEventListener(
        'transitionend',
        collapseFinishedCallback,
      );
    }
  }, [collapseBodyRef, onCollapseFinished]);

  const expand = useCallback(() => {
    if (collapseBodyRef.current) {
      if (isOnceExpandedRef.current) {
        isTransitioningRef.current = true;
      }

      collapseBodyRef.current.addEventListener(
        'transitionend',
        expandFinishedCallback,
      );

      requestAnimationFrame(() => {
        if (collapseBodyRef.current) {
          collapseBodyRef.current.style.height = `${collapseBodyRef.current.scrollHeight}px`;

          // make area focusable
          collapseBodyRef.current.removeAttribute('inert');
        }
      });
    }
  }, [collapseBodyRef, expandFinishedCallback]);

  const collapse = useCallback(() => {
    if (collapseBodyRef.current) {
      if (isOnceExpandedRef.current) {
        isTransitioningRef.current = true;
      }

      // we define the height to make collapse animatable
      collapseBodyRef.current.style.height = `${collapseBodyRef.current.scrollHeight}px`;
      collapseBodyRef.current.addEventListener(
        'transitionend',
        collapseFinishedCallback,
      );

      requestAnimationFrame(() => {
        if (collapseBodyRef.current) {
          collapseBodyRef.current.style.overflow = 'hidden';
          collapseBodyRef.current.style.height = '0px';

          // make area not focusable
          collapseBodyRef.current.setAttribute('inert', '');
        }
      });
    }
  }, [collapseBodyRef, collapseFinishedCallback]);

  const toggleCollapse = useCallback((): void => {
    if (!isTransitioningRef.current) {
      setIsExpand((prevIsOpen) => !prevIsOpen);
    }
  }, []);

  useLayoutEffect(() => {
    if (forceExpand) {
      setIsExpand(true);
      expand();
    }
  }, [forceExpand, expand]);

  useLayoutEffect(() => {
    if (isExpand) {
      expand();
    } else {
      collapse();
    }
  }, [isExpand, collapse, expand]);

  return {
    isExpand,
    toggleCollapse,
    isOnceExpanded: isOnceExpandedRef.current,
  };
};
