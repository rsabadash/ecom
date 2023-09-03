import { MutableRefObject, PropsWithChildren, ReactNode } from 'react';

import { ElementSize } from '../../common/types/size';

export type CollapseControllerProps = PropsWithChildren<{
  forceExpand?: boolean;
  isInitiallyExpand?: boolean;
  isToggleHidden?: boolean;
  onExpandFinished?: () => void;
  onCollapseFinished?: () => void;
  ariaLabel?: string;
  ariaControls?: string;
  collapseBodyRef: MutableRefObject<HTMLDivElement | null>;
}>;

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

export type CollapseBuilderBodyProps = PropsWithChildren<{
  id?: string;
  renderBodyOnExpand?: boolean;
  collapseBodyClassName?: string;
}>;

export type CollapseBuilderHeaderProps = PropsWithChildren<{
  isToggleHidden?: boolean;
  isToggleableHeader?: boolean;
  isCollapseDisabled?: boolean;
  headerClassName?: string;
}>;

export type CollapseControllerContextValue = {
  isExpand: boolean;
  isOnceExpanded: boolean;
  toggleCollapse: () => void;
  ariaLabel?: string;
  ariaControls?: string;
};
