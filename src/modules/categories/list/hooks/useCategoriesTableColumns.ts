import { useMemo } from 'react';

import { useTranslation } from '../../../../components/IntlProvider';
import {
  TableCellValueGetterProps,
  TableColumnGeneric,
} from '../../../../components/Table';
import { Category } from '../../common/types';

type UseCategoriesTableColumnsReturn = TableColumnGeneric<Category>[];

type CategoryValueGetterProps = TableCellValueGetterProps<Category>;

export const useCategoriesTableColumns =
  (): UseCategoriesTableColumnsReturn => {
    const { translate, getTranslationByLanguage } = useTranslation();

    return useMemo<TableColumnGeneric<Category>[]>(
      () => [
        {
          title: translate('category.name'),
          key: 'name',
          width: '70%',
          valueGetter: ({ item }: CategoryValueGetterProps) => {
            return getTranslationByLanguage(item.name);
          },
        },
        {
          title: translate('category.state'),
          key: 'isActive',
          width: '30%',
          valueGetter: ({ item }: CategoryValueGetterProps) => {
            return item.isActive
              ? translate('category.state.active')
              : translate('category.state.inactive');
          },
        },
      ],
      [translate, getTranslationByLanguage],
    );
  };
