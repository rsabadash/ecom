import { useMemo } from 'react';
import { Translations, useTranslation } from '../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../components/Table';
import { Category } from '../types';

type UseCategoriesTableColumns = () => TableColumnGeneric<Category>[];

export const useCategoriesTableColumns: UseCategoriesTableColumns = () => {
  const { translate, language } = useTranslation();

  return useMemo<TableColumnGeneric<Category>[]>(
    () => [
      {
        title: translate('category.name'),
        key: 'name',
        width: '70%',
        valueGetter: (value: Translations) => {
          return value[language];
        },
      },
      {
        title: translate('category.state'),
        key: 'isActive',
        width: '30%',
        valueGetter: (value: boolean) => {
          return value
            ? translate('category.state.active')
            : translate('category.state.inactive');
        },
      },
    ],
    [translate, language],
  );
};
