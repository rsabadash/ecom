import { PropsWithChildren, forwardRef } from 'react';
import clsx from 'clsx';
import { CollapseBuilderBodyProps } from './types';
import { useCollapseController } from './CollapseController';
import classes from './styles/index.module.css';

export const CollapseBuilderBody = forwardRef<
  HTMLDivElement,
  PropsWithChildren<CollapseBuilderBodyProps>
>(({ children, id, renderBodyOnExpand, collapseBodyClassName }, ref) => {
  const { isExpand, isOnceExpanded } = useCollapseController();

  const classNames = clsx(classes.collapseBody, collapseBodyClassName);

  // Supports if CollapseBuilderBody inside CollapseController (Context)
  const shouldRenderContent = renderBodyOnExpand
    ? isExpand || isOnceExpanded
    : true;

  return (
    <div id={id} className={classNames} ref={ref}>
      {shouldRenderContent && children}
    </div>
  );
});

CollapseBuilderBody.displayName = 'CollapseBuilderBody';
