import { useMemo } from 'react';

import { useIntlCurrency, useIntlDate } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import {
  TableCellValueGetterProps,
  TableColumnGeneric,
} from '../../../../components/Table';
import { Supply } from '../../detail/types';

type UseSuppliesTableColumnsReturn = TableColumnGeneric<Supply>[];

type SupplyValueGetterProps = TableCellValueGetterProps<Supply>;

export const useSuppliesTableColumns = (): UseSuppliesTableColumnsReturn => {
  const { translate } = useTranslation();

  const { formatDate } = useIntlDate();
  const { formatCurrency } = useIntlCurrency();

  return useMemo<TableColumnGeneric<Supply>[]>(
    () => [
      {
        title: translate('supply.name'),
        key: 'name',
        width: '50%',
        valueGetter: ({ item }: SupplyValueGetterProps) => {
          if (item.name) {
            return item.name;
          }

          const formattedDate = formatDate(item.createdAt);
          const supplyFromTranslation = translate('supply.from');

          return `${supplyFromTranslation} ${formattedDate}`;
        },
      },
      {
        title: translate('supply.product.totalCost'),
        key: 'productsTotalCost',
        width: '25%',
        valueGetter: ({ item }: SupplyValueGetterProps) => {
          return formatCurrency(item.productsTotalCost);
        },
      },
      {
        title: translate('supply.date'),
        key: 'createdAt',
        width: '25%',
        valueGetter: ({ item }: SupplyValueGetterProps) => {
          return formatDate(item.createdAt, { showTime: true });
        },
      },
    ],
    [formatCurrency, formatDate, translate],
  );
};
