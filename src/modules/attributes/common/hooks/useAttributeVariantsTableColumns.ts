import { useMemo } from 'react';
import {
  Translations,
  useTranslation,
} from '../../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../../components/Table';
import { AttributeVariant } from '../types';

type UseAttributeVariantsTableColumns = (
  isDetailList: boolean,
) => TableColumnGeneric<AttributeVariant>[];

export const useAttributeVariantsTableColumns: UseAttributeVariantsTableColumns =
  (isDetailList) => {
    const { translate, language } = useTranslation();

    return useMemo(
      () => [
        {
          title: translate('attribute.variant.name'),
          key: 'name',
          width: '30%',
          valueGetter: (value: Translations) => {
            return value[language];
          },
        },
        {
          title: translate('attribute.name'),
          key: 'attributeName',
          width: '30%',
          isHidden: isDetailList,
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
      ],
      [translate, isDetailList, language],
    );
  };
