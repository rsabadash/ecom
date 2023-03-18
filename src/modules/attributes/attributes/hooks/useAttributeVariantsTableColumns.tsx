import { useMemo } from 'react';
import {
  Translations,
  useTranslation,
} from '../../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../../components/Table';
import { Variant } from '../../variants/types';

type UseAttributeVariantsTableColumns = () => TableColumnGeneric<Variant>[];

export const useAttributeVariantsTableColumns: UseAttributeVariantsTableColumns =
  () => {
    const { translate, language } = useTranslation();

    return useMemo(
      () => [
        {
          title: translate('attribute.variant.name'),
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
      ],
      [translate, language],
    );
  };
