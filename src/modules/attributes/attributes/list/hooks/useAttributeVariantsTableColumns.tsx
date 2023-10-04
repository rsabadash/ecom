import { useMemo } from 'react';

import { useTranslation } from '../../../../../components/IntlProvider';
import {
  TableCellValueGetterProps,
  TableColumnGeneric,
} from '../../../../../components/Table';
import { Variant } from '../../../variants/common/types';

type UseAttributeVariantsTableColumnsReturn = TableColumnGeneric<Variant>[];

type VariantValueGetterProps = TableCellValueGetterProps<Variant>;

export const useAttributeVariantsTableColumns =
  (): UseAttributeVariantsTableColumnsReturn => {
    const { translate, getTranslationByLanguage } = useTranslation();

    return useMemo<TableColumnGeneric<Variant>[]>(
      () => [
        {
          title: translate('variant.name'),
          key: 'name',
          width: '25%',
          valueGetter: ({ item }: VariantValueGetterProps) => {
            return getTranslationByLanguage(item.name);
          },
        },
        {
          title: translate('attribute.state'),
          key: 'isActive',
          width: '25%',
          valueGetter: ({ item }: VariantValueGetterProps) => {
            return item.isActive
              ? translate('attribute.state.active')
              : translate('attribute.state.inactive');
          },
        },
        {
          title: translate('sortOrder'),
          key: 'sortOrder',
          width: '25%',
          valueGetter: ({ item }: VariantValueGetterProps) => {
            return item.sortOrder;
          },
        },
      ],
      [getTranslationByLanguage, translate],
    );
  };
