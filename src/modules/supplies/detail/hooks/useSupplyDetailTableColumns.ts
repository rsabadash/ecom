import { useMemo } from 'react';

import {
  useIntlCurrency,
  useTranslationWithFallback,
} from '../../../../common/hooks';
import {
  Translations,
  useTranslation,
} from '../../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../../components/Table';
import { SupplyDetailProduct } from '../types';

export const useSupplyDetailTableColumns = () => {
  const { translate } = useTranslation();
  const { translationWithFallback } = useTranslationWithFallback();

  const { formatCurrency } = useIntlCurrency();

  return useMemo<TableColumnGeneric<SupplyDetailProduct>[]>(
    () => [
      {
        title: translate('supply.product.name'),
        key: 'productName',
        width: '55%',
        valueGetter: ({ value }: { value: Translations }) => {
          return translationWithFallback(value);
        },
      },
      {
        title: translate('supply.product.price'),
        key: 'price',
        width: '15%',
        valueGetter: ({ value }: { value: string }) => {
          return formatCurrency(value);
        },
      },
      {
        title: translate('supply.product.quantity'),
        key: 'quantity',
        width: '15%',
      },
      {
        title: translate('supply.product.totalCost'),
        key: 'totalCost',
        width: '15%',
        valueGetter: ({ value }: { value: string }) => {
          return formatCurrency(value);
        },
      },
    ],
    [formatCurrency, translate, translationWithFallback],
  );
};
