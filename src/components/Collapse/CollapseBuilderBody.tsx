import { forwardRef, PropsWithChildren } from 'react';
import clsx from 'clsx';

import classes from './styles/index.module.css';

import { useCollapseController } from './CollapseController';
import { CollapseBuilderBodyProps } from './types';

export const CollapseBuilderBody = forwardRef<
  HTMLDivElement,
  PropsWithChildren<CollapseBuilderBodyProps>
>(({ children, id, renderBodyOnExpand, collapseBodyClassName }, ref) => {
  const { isExpand, isOnceExpanded } = useCollapseController();

  const collapseBodyClassNames = clsx(
    classes.collapseBody,
    collapseBodyClassName,
  );

  // Supports if CollapseBuilderBody inside CollapseController (Context)
  const shouldRenderContent = renderBodyOnExpand
    ? isExpand || isOnceExpanded
    : true;

  return (
    <div id={id} className={collapseBodyClassNames} ref={ref}>
      {shouldRenderContent && children}
    </div>
  );
});

CollapseBuilderBody.displayName = 'CollapseBuilderBody';
