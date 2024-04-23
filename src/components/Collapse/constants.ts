import { DEFAULT_ELEMENT_SIZE } from '../../common/constants/sizes';
import { CollapseControllerContextValue } from './types';

export const CONTEXT_NAME = 'CollapseControllerContext';

export const DEFAULT_COLLAPSE_BUTTON_SIZE = DEFAULT_ELEMENT_SIZE;

export const collapseControllerContextValueDefault: CollapseControllerContextValue =
  {
    isExpand: false,
    isOnceExpanded: false,
    expand: () => Promise.reject(undefined),
    collapse: () => Promise.reject(undefined),
  };
