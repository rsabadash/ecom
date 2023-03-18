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
  isInitiallyExpand = false,
  onExpandFinished,
  onCollapseFinished,
  collapseBodyRef,
}: UseCollapseControlProps): UseCollapseControlReturn => {
  const [isExpand, setIsExpand] = useState(false);
  const isOnceExpandedRef = useRef<boolean>(false);

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
      collapseBodyRef.current.removeEventListener(
        'transitionend',
        expandFinishedCallback,
      );
    }
  }, [collapseBodyRef, onExpandFinished]);

  const collapseFinishedCallback = useCallback(() => {
    onCollapseFinished && onCollapseFinished();

    if (collapseBodyRef.current) {
      collapseBodyRef.current.removeEventListener(
        'transitionend',
        collapseFinishedCallback,
      );
    }
  }, [collapseBodyRef, onCollapseFinished]);

  const expand = useCallback(() => {
    if (collapseBodyRef.current) {
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
    setIsExpand((prevIsOpen) => {
      if (prevIsOpen) {
        collapse();
      } else {
        expand();
      }

      return !prevIsOpen;
    });
  }, [collapse, expand]);

  useLayoutEffect(() => {
    if (isInitiallyExpand && collapseBodyRef.current) {
      setIsExpand(isInitiallyExpand);
    }
  }, [collapseBodyRef, isInitiallyExpand]);

  useLayoutEffect(() => {
    if (forceExpand) {
      expand();
    }
  }, [forceExpand, expand]);

  // useLayoutEffect(() => {
  //   if (isExpand) {
  //     expand();
  //   } else {
  //     collapse();
  //   }
  // }, [isExpand, collapse, expand]);

  return {
    isExpand,
    toggleCollapse,
    isOnceExpanded: isOnceExpandedRef.current,
  };
};
