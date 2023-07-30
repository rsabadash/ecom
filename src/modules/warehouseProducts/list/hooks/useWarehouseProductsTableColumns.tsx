import { useMemo } from 'react';

import { Unit } from '../../../../common/types/unit';
import { CollapseBuilderButton } from '../../../../components/Collapse';
import {
  Translations,
  useTranslation,
} from '../../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../../components/Table';
import { HORIZONTAL_ALIGNMENT } from '../../../../components/Table/constants';
import { WarehouseProductsAttribute, WarehouseProductTable } from '../types';

type UseWarehouseProductsTableColumnsReturn =
  TableColumnGeneric<WarehouseProductTable>[];

export const useWarehouseProductsTableColumns =
  (): UseWarehouseProductsTableColumnsReturn => {
    const { translate, language } = useTranslation();

    return useMemo<TableColumnGeneric<WarehouseProductTable>[]>(
      () => [
        {
          title: translate('warehouseProduct.name'),
          key: 'name',
          width: '40%',
          valueGetter: ({ value }: { value: Translations }) => {
            return value[language];
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
          valueGetter: ({ value }: { value: Unit }) => {
            return value ? translate(`unit.${value}`) : '';
          },
        },
        {
          title: translate('warehouseProduct.attributes.quantity'),
          key: 'attributes',
          width: '15%',
          valueGetter: ({
            value,
          }: {
            value: null | WarehouseProductsAttribute[];
          }) => {
            const quantity = value?.length ? value.length : '-';
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
          valueGetter: ({ item }: { item: WarehouseProductTable }) => {
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
