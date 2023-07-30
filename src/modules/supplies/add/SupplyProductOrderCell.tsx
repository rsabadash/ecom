import { FC } from 'react';

import classes from './styles/index.module.css';

import { SupplyProductOrderCellProps } from './types';

export const SupplyProductOrderCell: FC<SupplyProductOrderCellProps> = ({
  index,
}) => {
  return (
    <div className={classes.supplyProducts__listItemOrder}>{index + 1}</div>
  );
};
