import { MutableRefObject, PropsWithChildren, ReactNode } from 'react';

import { ElementSize } from '../../common/types/size';

export type BeforeExpandAction = () => void | Promise<void>;
export type BeforeCollapseAction = () => void | Promise<void>;
export type ExpandAction = () => void | Promise<void>;
export type CollapseAction = () => void | Promise<void>;

export type CollapseControllerProps = PropsWithChildren<{
  forceExpand?: boolean;
  forceCollapse?: boolean;
  isInitiallyExpand?: boolean;
  isBodyLoaded?: boolean;
  waitUntilBodyLoaded?: boolean;
  onBeforeExpand?: BeforeExpandAction;
  onBeforeCollapse?: BeforeCollapseAction;
  onExpand?: ExpandAction;
  onCollapse?: CollapseAction;
  onExpandFinished?: () => void;
  onCollapseFinished?: () => void;
  tabIndex?: number;
  ariaLabel?: string;
  ariaControls?: string;
  collapseBodyRef: MutableRefObject<HTMLDivElement | null>;
}>;

export type CollapseProps = Omit<CollapseControllerProps, 'collapseBodyRef'> & {
  header: ReactNode;
  body: ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  isToggleHidden?: boolean;
  isToggleableHeader?: boolean;
  isCollapseDisabled?: boolean;
};

export type CollapseBuilderButtonProps = {
  size?: ElementSize;
  iconSize?: string;
  tabIndex?: number;
  isFocusable?: boolean;
  collapseButtonClassName?: string;
  isCollapseDisabled?: boolean;
};

export type CollapseBuilderBodyProps = PropsWithChildren<{
  id?: string;
  collapseBodyClassName?: string;
}>;

export type CollapseBuilderHeaderProps = PropsWithChildren<{
  tabIndex?: number;
  isToggleHidden?: boolean;
  isToggleableHeader?: boolean;
  isCollapseDisabled?: boolean;
  headerClassName?: string;
}>;

export type CollapseControllerContextValue = {
  isExpand: boolean;
  isOnceExpanded: boolean;
  expand: () => Promise<void>;
  collapse: () => Promise<void>;
  ariaLabel?: string;
  ariaControls?: string;
};
