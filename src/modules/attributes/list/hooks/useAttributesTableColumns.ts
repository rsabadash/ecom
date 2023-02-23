import { useMemo } from 'react';
import {
  Translations,
  useTranslation,
} from '../../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../../components/Table';
import { Attribute, AttributeVariant } from '../../common/types';

type UseAttributeTableColumns = () => TableColumnGeneric<Attribute>[];

export const useAttributesTableColumns: UseAttributeTableColumns = () => {
  const { translate, language } = useTranslation();

  return useMemo(
    () => [
      {
        title: translate('attribute.name'),
        key: 'name',
        width: '50%',
        valueGetter: (value: Translations) => {
          return value[language];
        },
      },
      {
        title: translate('attribute.state'),
        key: 'isActive',
        width: '15%',
        valueGetter: (value: boolean) => {
          return value
            ? translate('attribute.state.active')
            : translate('attribute.state.inactive');
        },
      },
      {
        title: translate('sortOrder'),
        key: 'sortOrder',
        width: '15%',
        valueGetter: (value: number) => {
          return value;
        },
      },
      {
        title: translate('attribute.variant.count'),
        key: 'variants',
        width: '15%',
        valueGetter: (value: AttributeVariant[]) => {
          return value.length;
        },
      },
    ],
    [translate, language],
  );
};
