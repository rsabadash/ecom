import { PropsWithChildren, forwardRef } from 'react';
import { CollapseBodyProps } from './types';
import classes from './styles/index.module.css';

export const CollapseBuilderBody = forwardRef<
  HTMLDivElement,
  PropsWithChildren<CollapseBodyProps>
>(({ children, id }, ref) => {
  return (
    <div id={id} className={classes.collapseBody} ref={ref}>
      {children}
    </div>
  );
});

CollapseBuilderBody.displayName = 'CollapseBuilderBody';
