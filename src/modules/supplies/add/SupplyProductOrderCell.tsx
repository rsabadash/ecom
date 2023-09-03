import { FC } from 'react';

import { SupplyProductOrderCellProps } from './types';

import classes from './styles/index.module.css';

export const SupplyProductOrderCell: FC<SupplyProductOrderCellProps> = ({
  index,
}) => {
  return (
    <div className={classes.supplyProducts__listItemOrder}>{index + 1}</div>
  );
};
