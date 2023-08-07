import { PropsWithChildren, ReactNode } from 'react';

import { TOOLTIP_POSITION } from './constants';

export type Position = ValuesOfObject<typeof TOOLTIP_POSITION>;

export type TooltipProps = PropsWithChildren<{
  position?: Position;
  content: ReactNode;
  contentId?: string;
  isDisabled?: boolean;
  isClickable?: boolean;
  isObserveResize?: boolean;
  isChildrenFocusable?: boolean;
  tooltipClassName?: string;
}>;
