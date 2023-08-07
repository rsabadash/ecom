import { useMemo } from 'react';

import { useTranslation } from '../../../../components/IntlProvider';
import {
  TableCellValueGetterProps,
  TableColumnGeneric,
} from '../../../../components/Table';
import { Attribute } from '../types';

type UseAttributeTableColumnsReturn = TableColumnGeneric<Attribute>[];

type AttributeValueGetterProps = TableCellValueGetterProps<Attribute>;

export const useAttributesTableColumns = (): UseAttributeTableColumnsReturn => {
  const { translate, language } = useTranslation();

  return useMemo<TableColumnGeneric<Attribute>[]>(
    () => [
      {
        title: translate('attribute.name'),
        key: 'name',
        width: '25%',
        valueGetter: ({ item }: AttributeValueGetterProps) => {
          return item.name[language];
        },
      },
      {
        title: translate('attribute.state'),
        key: 'isActive',
        width: '25%',
        valueGetter: ({ item }: AttributeValueGetterProps) => {
          return item.isActive
            ? translate('attribute.state.active')
            : translate('attribute.state.inactive');
        },
      },
      {
        title: translate('sortOrder'),
        key: 'sortOrder',
        width: '25%',
        valueGetter: ({ item }: AttributeValueGetterProps) => {
          return item.sortOrder;
        },
      },
      {
        title: translate('attribute.variant.count'),
        key: 'variants',
        width: '25%',
        valueGetter: ({ item }: AttributeValueGetterProps) => {
          return item.variants.length;
        },
      },
    ],
    [translate, language],
  );
};
