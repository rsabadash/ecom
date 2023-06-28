import { FC, useMemo } from 'react';
import { SummaryRow, SupplyDetailListSummaryProps } from './types';
import { useIntlCurrency } from '../../../hooks';
import classes from './styles/index.module.css';

export const SupplyDetailListSummary: FC<SupplyDetailListSummaryProps> = ({
  columns,
  productsTotalCost,
  productsTotalQuantity,
}) => {
  const { formatCurrency } = useIntlCurrency();

  const summaryRow = useMemo<SummaryRow>(
    () => ({
      totalCost: {
        value: productsTotalCost,
        valueGetter: (value: string) => formatCurrency(value),
      },
      quantity: {
        value: productsTotalQuantity,
      },
    }),
    [formatCurrency, productsTotalCost, productsTotalQuantity],
  );

  return (
    <div className={classes.supplyDetailListSummary}>
      {columns.map(({ key, width, align }) => {
        const { value, valueGetter } = summaryRow[key] || {};

        const rowValue = valueGetter ? valueGetter(value || '') : value;

        return (
          <div key={key} style={{ width, justifyContent: align }}>
            {rowValue || null}
          </div>
        );
      })}
    </div>
  );
};
