import { useMemo } from 'react';

import { useIntlCurrency } from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import {
  TableCellValueGetterProps,
  TableColumnGeneric,
} from '../../../../components/Table';
import { SupplyDetailProduct } from '../types';

type UseSupplyDetailTableColumnsReturn =
  TableColumnGeneric<SupplyDetailProduct>[];

type SupplyDetailProductValueGetterProps =
  TableCellValueGetterProps<SupplyDetailProduct>;

export const useSupplyDetailTableColumns =
  (): UseSupplyDetailTableColumnsReturn => {
    const { translate, getTranslationWithFallback } = useTranslation();

    const { formatCurrency } = useIntlCurrency();

    return useMemo<TableColumnGeneric<SupplyDetailProduct>[]>(
      () => [
        {
          title: translate('supply.product.name'),
          key: 'productName',
          width: '55%',
          valueGetter: ({ item }: SupplyDetailProductValueGetterProps) => {
            return getTranslationWithFallback(item.productName);
          },
        },
        {
          title: translate('supply.product.price'),
          key: 'price',
          width: '15%',
          valueGetter: ({ item }: SupplyDetailProductValueGetterProps) => {
            return formatCurrency(item.price);
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
          valueGetter: ({ item }: SupplyDetailProductValueGetterProps) => {
            return formatCurrency(item.totalCost);
          },
        },
      ],
      [formatCurrency, translate, getTranslationWithFallback],
    );
  };
