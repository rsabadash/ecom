import { useCallback, useEffect, useRef, useState } from 'react';

import {
  BeforeCollapseAction,
  BeforeExpandAction,
  CollapseAction,
  CollapseControllerProps,
  ExpandAction,
} from '../types';

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
  expand: () => Promise<void>;
  collapse: () => Promise<void>;
  isOnceExpanded: boolean;
};

export const useCollapseControl = ({
  forceExpand,
  forceCollapse,
  isInitiallyExpand,
  isBodyLoaded,
  waitUntilBodyLoaded,
  onBeforeExpand,
  onBeforeCollapse,
  onExpand,
  onCollapse,
  onExpandFinished,
  onCollapseFinished,
  collapseBodyRef,
}: UseCollapseControlProps): UseCollapseControlReturn => {
  const [isExpand, setIsExpand] = useState<boolean>(() => !!isInitiallyExpand);
  const [actionType, setActionType] = useState<'expand' | 'collapse'>(() =>
    isInitiallyExpand ? 'expand' : 'collapse',
  );

  const isOnceExpandedRef = useRef<boolean>(false);
  // to prevent expand/collapse on initial render
  const isActionTriggeredRef = useRef<boolean>(false);
  // To prevent bug when the transition delay has not ended but user collapse the body
  const isTransitioningRef = useRef<boolean>(false);
  const isBodyLoadedRef = useRef<boolean>(false);

  const onBeforeExpandRef = useRef<BeforeExpandAction | undefined>(
    onBeforeExpand,
  );
  const onBeforeCollapseRef = useRef<BeforeCollapseAction | undefined>(
    onBeforeCollapse,
  );
  const onExpandRef = useRef<ExpandAction | undefined>(onExpand);
  const onCollapseRef = useRef<CollapseAction | undefined>(onCollapse);

  const expandFinishedCallback = useCallback((): void => {
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

  const collapseFinishedCallback = useCallback((): void => {
    onCollapseFinished && onCollapseFinished();

    if (collapseBodyRef.current) {
      isTransitioningRef.current = false;

      collapseBodyRef.current.removeEventListener(
        'transitionend',
        collapseFinishedCallback,
      );
    }
  }, [collapseBodyRef, onCollapseFinished]);

  const expand = useCallback((): void => {
    if (collapseBodyRef.current) {
      if (isOnceExpandedRef.current) {
        isTransitioningRef.current = true;
      }

      collapseBodyRef.current.addEventListener(
        'transitionend',
        expandFinishedCallback,
      );

      requestAnimationFrame((): void => {
        if (collapseBodyRef.current) {
          collapseBodyRef.current.style.height = `${collapseBodyRef.current.scrollHeight}px`;

          // make area focusable
          collapseBodyRef.current.removeAttribute('inert');
        }
      });
    }
  }, [collapseBodyRef, expandFinishedCallback]);

  const collapse = useCallback((): void => {
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

      requestAnimationFrame((): void => {
        if (collapseBodyRef.current) {
          collapseBodyRef.current.style.overflow = 'hidden';
          collapseBodyRef.current.style.height = '0px';

          // make area not focusable
          collapseBodyRef.current.setAttribute('inert', '');
        }
      });
    }
  }, [collapseBodyRef, collapseFinishedCallback]);

  const handleExpand = useCallback(async (): Promise<void> => {
    if (!isTransitioningRef.current) {
      await onBeforeExpandRef.current?.();

      if (!isActionTriggeredRef.current) {
        isActionTriggeredRef.current = true;
      }

      setActionType('expand');

      await onExpandRef.current?.();
    }
  }, []);

  const handleCollapse = useCallback(async (): Promise<void> => {
    if (!isTransitioningRef.current) {
      await onBeforeCollapseRef.current?.();

      if (!isActionTriggeredRef.current) {
        isActionTriggeredRef.current = true;
      }

      setActionType('collapse');

      await onCollapseRef.current?.();
    }
  }, []);

  useEffect(() => {
    if (forceExpand) {
      handleExpand();
    }
  }, [forceExpand, handleExpand]);

  useEffect(() => {
    if (forceCollapse && isOnceExpandedRef.current) {
      handleCollapse();
    }
  }, [forceCollapse, handleCollapse]);

  useEffect(() => {
    // do not trigger io first render
    if (
      isActionTriggeredRef.current &&
      // if we need to wait until body is loaded do not react on action triggering
      (!waitUntilBodyLoaded || (waitUntilBodyLoaded && isBodyLoadedRef.current))
    ) {
      if (actionType === 'expand') {
        setIsExpand(true);
        return expand();
      }

      if (actionType === 'collapse') {
        setIsExpand(false);
        return collapse();
      }
    }
  }, [actionType, collapse, expand, waitUntilBodyLoaded]);

  useEffect(() => {
    if (isBodyLoaded && waitUntilBodyLoaded && !isBodyLoadedRef.current) {
      isBodyLoadedRef.current = true;

      if (actionType === 'expand') {
        setIsExpand(true);
        return expand();
      }
    }
  }, [actionType, expand, handleExpand, isBodyLoaded, waitUntilBodyLoaded]);

  return {
    isExpand,
    expand: handleExpand,
    collapse: handleCollapse,
    isOnceExpanded: isOnceExpandedRef.current,
  };
};
