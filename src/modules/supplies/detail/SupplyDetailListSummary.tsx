import { FC, useMemo } from 'react';

import { useIntlCurrency } from '../../../common/hooks';
import { SummaryRow, SupplyDetailListSummaryProps } from './types';

import classes from './styles/index.module.css';

export const SupplyDetailListSummary: FC<SupplyDetailListSummaryProps> = ({
  columns,
  productsTotalCost,
}) => {
  const { formatCurrency } = useIntlCurrency();

  const summaryRow = useMemo<SummaryRow>(
    () => ({
      totalCost: {
        value: productsTotalCost,
        valueGetter: (value: string) => formatCurrency(value),
      },
    }),
    [formatCurrency, productsTotalCost],
  );

  return (
    <div className={classes.supplyDetailListSummary}>
      {columns.map(({ key, width, align }) => {
        const { value, valueGetter } = summaryRow[key] || {};

        const rowValue = valueGetter ? valueGetter(value || '') : value;

        return (
          <div
            key={key}
            style={{ width, justifyContent: align }}
            className={classes.supplyDetailListSummary__item}
          >
            {rowValue || null}
          </div>
        );
      })}
    </div>
  );
};
