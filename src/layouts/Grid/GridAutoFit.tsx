import { CSSProperties, FC, PropsWithChildren } from 'react';

import classes from './styles/index.module.css';

import { DEFAULT_MIN_COLUMN_WIDTH } from './constants';
import { GridAutoFitProps } from './types';

export const GridAutoFit: FC<PropsWithChildren<GridAutoFitProps>> = ({
  children,
  gridColumnMinWidth = DEFAULT_MIN_COLUMN_WIDTH,
}) => {
  const styleVariables = {
    '--grid-column-min-width': `${gridColumnMinWidth}px`,
  } as CSSProperties;

  return (
    <div className={classes.gridAutoFit} style={styleVariables}>
      {children}
    </div>
  );
};
