import { useMemo } from 'react';
import {
  Translations,
  useTranslation,
} from '../../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../../components/Table';
import {
  WarehouseProduct,
  WarehouseProductsAttribute,
  WarehouseProductTable,
} from '../types';
import { CollapseBuilderButton } from '../../../../components/Collapse';
import { horizontalAlignment } from '../../../../components/Table/constants';

type UseWarehouseProductsTableColumns =
  () => TableColumnGeneric<WarehouseProductTable>[];

export const useWarehouseProductsTableColumns: UseWarehouseProductsTableColumns =
  () => {
    const { translate, language } = useTranslation();

    return useMemo<TableColumnGeneric<WarehouseProductTable>[]>(
      () => [
        {
          title: translate('warehouseProducts.name'),
          key: 'name',
          width: '55%',
          valueGetter: (value: Translations) => {
            return value[language];
          },
        },
        {
          title: translate('warehouseProducts.sku'),
          key: 'sku',
          width: '20%',
        },
        {
          title: translate('warehouseProducts.attributes.quantity'),
          key: 'attributes',
          width: '15%',
          valueGetter: (value: null | WarehouseProductsAttribute[]) => {
            const quantity = value?.length ? value.length : '-';
            const ariaValue = quantity === '-' ? 0 : quantity;

            return (
              <div
                aria-label={`${translate(
                  'warehouseProducts.attributes.quantity',
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
          align: horizontalAlignment.end,
          valueGetter: (_: undefined, item: WarehouseProduct) => {
            if (item.attributes?.length) {
              return (
                <CollapseBuilderButton isCollapseDisabled iconSize="1rem" />
              );
            }

            return null;
          },
        },
      ],
      [translate, language],
    );
  };
