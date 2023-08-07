import { FC } from 'react';

import { TableCellProps } from './types';

import classes from './styles/index.module.css';

export const TableCell: FC<TableCellProps> = ({ align, width, children }) => {
  return (
    <div
      style={{ width, justifyContent: align }}
      className={classes.table__cell}
      role="gridcell"
    >
      {children}
    </div>
  );
};
