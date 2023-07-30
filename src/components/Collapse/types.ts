import { MutableRefObject, ReactNode } from 'react';

import { ElementSize } from '../../common/types/size';

export type CollapseControllerProps = {
  forceExpand?: boolean;
  isInitiallyExpand?: boolean;
  isToggleHidden?: boolean;
  onExpandFinished?: () => void;
  onCollapseFinished?: () => void;
  ariaLabel?: string;
  ariaControls?: string;
  collapseBodyRef: MutableRefObject<HTMLDivElement | null>;
};

export type CollapseProps = Omit<CollapseControllerProps, 'collapseBodyRef'> & {
  header: ReactNode;
  body: ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  isToggleableHeader?: boolean;
  isCollapseDisabled?: boolean;
  renderBodyOnExpand?: boolean;
};

export type CollapseBuilderButtonProps = {
  size?: ElementSize;
  iconSize?: string;
  collapseButtonClassName?: string;
  isCollapseDisabled?: boolean;
};

export type CollapseBuilderBodyProps = {
  id?: string;
  renderBodyOnExpand?: boolean;
  collapseBodyClassName?: string;
};

export type CollapseBuilderHeaderProps = {
  isToggleHidden?: boolean;
  isToggleableHeader?: boolean;
  isCollapseDisabled?: boolean;
  headerClassName?: string;
};

export type CollapseControllerContextValue = {
  isExpand: boolean;
  isOnceExpanded: boolean;
  toggleCollapse: () => void;
  ariaLabel?: string;
  ariaControls?: string;
};
