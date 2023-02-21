import { PropsWithChildren, forwardRef } from 'react';
import clsx from 'clsx';
import { CollapseBodyProps } from './types';
import classes from './styles/index.module.css';

export const CollapseBuilderBody = forwardRef<
  HTMLDivElement,
  PropsWithChildren<CollapseBodyProps>
>(({ children, id, collapseBodyClassName }, ref) => {
  const classNames = clsx(classes.collapseBody, collapseBodyClassName);

  return (
    <div id={id} className={classNames} ref={ref}>
      {children}
    </div>
  );
});

CollapseBuilderBody.displayName = 'CollapseBuilderBody';
