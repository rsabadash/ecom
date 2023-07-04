import { FC, PropsWithChildren, useMemo } from 'react';

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
