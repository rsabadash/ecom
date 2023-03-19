import { CollapseControllerContextValue } from './types';

export const CONTEXT_NAME = 'CollapseControllerContext';

export const collapseControllerContextValueDefault: CollapseControllerContextValue =
  {
    isExpand: false,
    isOnceExpanded: false,
    toggleCollapse: () => undefined,
  };
