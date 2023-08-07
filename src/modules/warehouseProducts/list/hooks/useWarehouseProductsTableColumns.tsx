import { useMemo } from 'react';

import { CollapseBuilderButton } from '../../../../components/Collapse';
import { useTranslation } from '../../../../components/IntlProvider';
import {
  TableCellValueGetterProps,
  TableColumnGeneric,
} from '../../../../components/Table';
import { HORIZONTAL_ALIGNMENT } from '../../../../components/Table/constants';
import { WarehouseProductTable } from '../types';

type UseWarehouseProductsTableColumnsReturn =
  TableColumnGeneric<WarehouseProductTable>[];

type WarehouseProductTableValueGetterProps =
  TableCellValueGetterProps<WarehouseProductTable>;

export const useWarehouseProductsTableColumns =
  (): UseWarehouseProductsTableColumnsReturn => {
    const { translate, getTranslationWithFallback } = useTranslation();

    return useMemo<TableColumnGeneric<WarehouseProductTable>[]>(
      () => [
        {
          title: translate('warehouseProduct.name'),
          key: 'name',
          width: '40%',
          valueGetter: ({ item }: WarehouseProductTableValueGetterProps) => {
            return getTranslationWithFallback(item.name);
          },
        },
        {
          title: translate('warehouseProduct.sku'),
          key: 'sku',
          width: '20%',
        },
        {
          title: translate('warehouseProduct.unit'),
          key: 'unit',
          width: '15%',
          valueGetter: ({ item }: WarehouseProductTableValueGetterProps) => {
            return item.unit ? translate(`unit.${item.unit}`) : '';
          },
        },
        {
          title: translate('warehouseProduct.attributes.quantity'),
          key: 'attributes',
          width: '15%',
          valueGetter: ({ item }: WarehouseProductTableValueGetterProps) => {
            const quantity = item.attributes?.length
              ? item.attributes.length
              : '-';
            const ariaValue = quantity === '-' ? 0 : quantity;

            return (
              <div
                aria-label={`${translate(
                  'warehouseProduct.attributes.quantity',
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
          valueGetter: ({ item }: WarehouseProductTableValueGetterProps) => {
            if (item.attributes?.length) {
              return (
                <CollapseBuilderButton isCollapseDisabled iconSize="1rem" />
              );
            }

            return null;
          },
        },
      ],
      [translate, getTranslationWithFallback],
    );
  };
