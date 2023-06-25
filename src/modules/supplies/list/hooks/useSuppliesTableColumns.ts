import { useTranslation } from '../../../../components/IntlProvider';
import { useMemo } from 'react';
import { TableColumnGeneric } from '../../../../components/Table';
import { Supply } from '../types';

type UseSuppliesTableColumnsReturn = TableColumnGeneric<Supply>[];

export const useSuppliesTableColumns = (): UseSuppliesTableColumnsReturn => {
  const { translate, language } = useTranslation();

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

          const date = new Date(item.createdAt);
          const dateIntl = new Intl.DateTimeFormat(language, {
            dateStyle: 'short',
          });

          const formattedDate = dateIntl.format(date);
          const supplyFromTranslation = translate('supply.from');

          return `${supplyFromTranslation} ${formattedDate}`;
        },
      },
      {
        title: translate('supply.product.totalCost'),
        key: 'productsTotalCost',
        width: '25%',
        valueGetter: ({ value }: { value: string }) => {
          return new Intl.NumberFormat(language, {
            style: 'currency',
            currency: 'UAH',
          }).format(Number(value));
        },
      },
      {
        title: translate('supply.date'),
        key: 'createdAt',
        width: '25%',
        valueGetter: ({ value }: { value: string }) => {
          const date = new Date(value);
          const dateIntl = new Intl.DateTimeFormat(language, {
            dateStyle: 'short',
            timeStyle: 'short',
            hour12: false,
          });

          return dateIntl.format(date);
        },
      },
    ],
    [language, translate],
  );
};
