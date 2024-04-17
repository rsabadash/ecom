import { useMemo } from 'react';

import { CollapseBuilderButton } from '../../../../components/Collapse';
import { useTranslation } from '../../../../components/IntlProvider';
import {
  TableCellValueGetterProps,
  TableColumnGeneric,
} from '../../../../components/Table';
import { HORIZONTAL_ALIGNMENT } from '../../../../components/Table/constants';
import { ProductTable } from '../types';

type UseProductsTableColumnsReturn = TableColumnGeneric<ProductTable>[];

type ProductTableValueGetterProps = TableCellValueGetterProps<ProductTable>;

export const useProductsTableColumns = (): UseProductsTableColumnsReturn => {
  const { translate, getTranslationByLanguage } = useTranslation();

  return useMemo<TableColumnGeneric<ProductTable>[]>(
    () => [
      {
        title: translate('product.name'),
        key: 'name',
        width: '40%',
        valueGetter: ({ item }: ProductTableValueGetterProps) => {
          return item.name;
        },
      },
      {
        title: translate('product.sku'),
        key: 'sku',
        width: '20%',
      },
      {
        title: translate('product.unit'),
        key: 'unit',
        width: '15%',
        valueGetter: ({ item }: ProductTableValueGetterProps) => {
          return item.unit ? translate(`unit.${item.unit}`) : '';
        },
      },
      {
        title: translate('product.attributes.quantity'),
        key: 'attributes',
        width: '15%',
        valueGetter: ({ item }: ProductTableValueGetterProps) => {
          const quantity = item.attributes?.length
            ? item.attributes.length
            : '-';
          const ariaValue = quantity === '-' ? 0 : quantity;

          return (
            <div
              aria-label={`${translate(
                'product.attributes.quantity',
              )} ${ariaValue}`}
            >
              {quantity}
            </div>
          );
        },
      },
      {
        title: '',
        key: 'button',
        width: '10%',
        align: HORIZONTAL_ALIGNMENT.END,
        valueGetter: ({ item }: ProductTableValueGetterProps) => {
          if (item.attributes?.length) {
            return <CollapseBuilderButton isCollapseDisabled iconSize="1rem" />;
          }

          return null;
        },
      },
    ],
    [translate, getTranslationByLanguage],
  );
};
