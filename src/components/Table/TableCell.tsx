import { FC, PropsWithChildren } from 'react';
import { TableCellProps } from './types';
import classes from './styles/index.module.css';

export const TableCell: FC<PropsWithChildren<TableCellProps>> = ({
  align,
  width,
  children,
}) => {
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
