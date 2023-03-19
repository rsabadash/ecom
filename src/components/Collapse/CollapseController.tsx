import { FC, PropsWithChildren, useMemo } from 'react';
import {
  CollapseControllerContextValue,
  CollapseControllerProps,
} from './types';
import {
  CONTEXT_NAME,
  collapseControllerContextValueDefault,
} from './constants';
import { createProvider } from '../../utils';
import { useCollapseControl } from './hooks';

const [Provider, useCollapseController] =
  createProvider<CollapseControllerContextValue>({
    contextName: CONTEXT_NAME,
    contextDefaultValue: collapseControllerContextValueDefault,
  });

const CollapseController: FC<PropsWithChildren<CollapseControllerProps>> = ({
  children,
  forceExpand,
  isInitiallyExpand = false,
  onExpandFinished,
  onCollapseFinished,
  ariaLabel,
  ariaControls,
  collapseBodyRef,
}) => {
  const { isExpand, isOnceExpanded, toggleCollapse } = useCollapseControl({
    collapseBodyRef,
    onCollapseFinished,
    forceExpand,
    isInitiallyExpand,
    onExpandFinished,
  });

  const contextValue = useMemo<CollapseControllerContextValue>(() => {
    return {
      isExpand,
      isOnceExpanded,
      toggleCollapse,
      ariaLabel,
      ariaControls,
    };
  }, [isExpand, isOnceExpanded, toggleCollapse, ariaLabel, ariaControls]);

  return <Provider value={contextValue}>{children}</Provider>;
};

CollapseController.displayName = 'CollapseController';

export { CollapseController, useCollapseController };
