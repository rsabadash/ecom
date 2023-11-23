import { FC, useMemo } from 'react';

import { createProvider } from '../../common/utils';
import {
  collapseControllerContextValueDefault,
  CONTEXT_NAME,
} from './constants';
import { useCollapseControl } from './hooks';
import {
  CollapseControllerContextValue,
  CollapseControllerProps,
} from './types';

const [Provider, useCollapseController] =
  createProvider<CollapseControllerContextValue>({
    contextName: CONTEXT_NAME,
    contextDefaultValue: collapseControllerContextValueDefault,
  });

const CollapseController: FC<CollapseControllerProps> = ({
  children,
  forceExpand,
  forceCollapse,
  isInitiallyExpand = false,
  isBodyLoaded,
  waitUntilBodyLoaded,
  onBeforeExpand,
  onBeforeCollapse,
  onExpand,
  onCollapse,
  onExpandFinished,
  onCollapseFinished,
  ariaLabel,
  ariaControls,
  collapseBodyRef,
}) => {
  const { isExpand, isOnceExpanded, expand, collapse } = useCollapseControl({
    collapseBodyRef,
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
  });

  const contextValue = useMemo<CollapseControllerContextValue>(() => {
    return {
      isExpand,
      isOnceExpanded,
      expand,
      collapse,
      ariaLabel,
      ariaControls,
    };
  }, [isExpand, isOnceExpanded, expand, collapse, ariaLabel, ariaControls]);

  return <Provider value={contextValue}>{children}</Provider>;
};

CollapseController.displayName = 'CollapseController';

export { CollapseController, useCollapseController };
