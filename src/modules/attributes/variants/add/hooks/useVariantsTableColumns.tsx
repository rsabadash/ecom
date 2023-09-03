import { useMemo } from 'react';

import { routes } from '../../../../../common/constants/routes';
import { useCustomNavigate } from '../../../../../common/hooks';
import { useTranslation } from '../../../../../components/IntlProvider';
import {
  TableCellValueGetterProps,
  TableColumnGeneric,
} from '../../../../../components/Table';
import { Variant, VariantWithAttribute } from '../types';

type UseVariantsTableColumnsReturn = TableColumnGeneric<VariantWithAttribute>[];

type VariantWithAttributeValueGetterProps =
  TableCellValueGetterProps<VariantWithAttribute>;

export const useVariantsTableColumns = (): UseVariantsTableColumnsReturn => {
  const navigate = useCustomNavigate();
  const { translate, getTranslationWithFallback } = useTranslation();

  return useMemo<
    (TableColumnGeneric<Variant> | TableColumnGeneric<VariantWithAttribute>)[]
  >(
    () => [
      {
        title: translate('attribute.variant.name'),
        key: 'name',
        width: '25%',
        valueGetter: ({ item }: VariantWithAttributeValueGetterProps) => {
          return getTranslationWithFallback(item.name);
        },
      },
      {
        title: translate('attribute.name'),
        key: 'attributeName',
        width: '25%',
        valueGetter: ({ item }: VariantWithAttributeValueGetterProps) => {
          return (
            <span
              onClick={(e) => {
                e.preventDefault();
                navigate(`${routes.attributes.root}/${item.attributeId}`);
              }}
            >
              {getTranslationWithFallback(item.attributeName)}
            </span>
          );
        },
      },
      {
        title: translate('attribute.state'),
        key: 'isActive',
        width: '25%',
        valueGetter: ({ item }: VariantWithAttributeValueGetterProps) => {
          return item.isActive
            ? translate('attribute.state.active')
            : translate('attribute.state.inactive');
        },
      },
      {
        title: translate('sortOrder'),
        key: 'sortOrder',
        width: '25%',
        valueGetter: ({ item }: VariantWithAttributeValueGetterProps) => {
          return item.sortOrder;
        },
      },
    ],
    [translate, getTranslationWithFallback, navigate],
  );
};
