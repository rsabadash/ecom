import { CollapseControllerContextValue } from './types';

export const CONTEXT_NAME = 'CollapseControllerContext';

export const DEFAULT_ICON_SIZE = '24px';

export const collapseControllerContextValueDefault: CollapseControllerContextValue =
  {
    isExpand: false,
    isOnceExpanded: false,
    toggleCollapse: () => undefined,
  };
