import { forwardRef } from 'react';
import clsx from 'clsx';

import { CollapseBuilderBodyProps } from './types';

import classes from './styles/index.module.css';

export const CollapseBuilderBody = forwardRef<
  HTMLDivElement,
  CollapseBuilderBodyProps
>(({ children, id, collapseBodyClassName }, ref) => {
  const collapseBodyClassNames = clsx(
    classes.collapseBody,
    collapseBodyClassName,
  );

  return (
    <div id={id} className={collapseBodyClassNames} ref={ref}>
      {children}
    </div>
  );
});

CollapseBuilderBody.displayName = 'CollapseBuilderBody';
