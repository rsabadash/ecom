import { useMemo } from 'react';

import { useIntlCurrency, useIntlDate } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../../components/Table';
import { Supply } from '../types';

type UseSuppliesTableColumnsReturn = TableColumnGeneric<Supply>[];

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
        valueGetter: ({
          value,
          item,
        }: {
          value: null | string;
          item: Supply;
        }) => {
          if (value) {
            return value;
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
        valueGetter: ({ value }: { value: string }) => {
          return formatCurrency(value);
        },
      },
      {
        title: translate('supply.date'),
        key: 'createdAt',
        width: '25%',
        valueGetter: ({ value }: { value: string }) => {
          return formatDate(value, { showTime: true });
        },
      },
    ],
    [formatCurrency, formatDate, translate],
  );
};
