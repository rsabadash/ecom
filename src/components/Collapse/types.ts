import { MutableRefObject, ReactNode } from 'react';

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
};

export type CollapseBuilderButtonProps = {
  collapseButtonClassName?: string;
};

export type CollapseBodyProps = {
  id?: string;
  collapseBodyClassName?: string;
};

export type CollapseControllerContextValue = {
  isExpand: boolean;
  toggleCollapse: () => void;
  ariaLabel?: string;
  ariaControls?: string;
};
