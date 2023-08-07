import { useMemo } from 'react';

import { useTranslation } from '../../../components/IntlProvider';
import {
  TableCellValueGetterProps,
  TableColumnGeneric,
} from '../../../components/Table';
import { Category } from '../types';

type UseCategoriesTableColumnsReturn = TableColumnGeneric<Category>[];

type CategoryValueGetterProps = TableCellValueGetterProps<Category>;

export const useCategoriesTableColumns =
  (): UseCategoriesTableColumnsReturn => {
    const { translate, language } = useTranslation();

    return useMemo<TableColumnGeneric<Category>[]>(
      () => [
        {
          title: translate('category.name'),
          key: 'name',
          width: '70%',
          valueGetter: ({ item }: CategoryValueGetterProps) => {
            return item.name[language];
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
      [translate, language],
    );
  };
