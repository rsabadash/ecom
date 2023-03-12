import { useMemo } from 'react';
import {
  Translations,
  useTranslation,
} from '../../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../../components/Table';
import { Attribute, Variant } from '../../common/types';

type UseAttributeTableColumns = () => TableColumnGeneric<Attribute>[];

export const useAttributesTableColumns: UseAttributeTableColumns = () => {
  const { translate, language } = useTranslation();

  return useMemo<TableColumnGeneric<Attribute>[]>(
    () => [
      {
        title: translate('attribute.name'),
        key: 'name',
        width: '25%',
        valueGetter: (value: Translations) => {
          return value[language];
        },
      },
      {
        title: translate('attribute.state'),
        key: 'isActive',
        width: '25%',
        valueGetter: (value: boolean) => {
          return value
            ? translate('attribute.state.active')
            : translate('attribute.state.inactive');
        },
      },
      {
        title: translate('sortOrder'),
        key: 'sortOrder',
        width: '25%',
        valueGetter: (value: number) => {
          return value;
        },
      },
      {
        title: translate('attribute.variant.count'),
        key: 'variants',
        width: '25%',
        valueGetter: (value: Variant[]) => {
          return value.length;
        },
      },
    ],
    [translate, language],
  );
};
