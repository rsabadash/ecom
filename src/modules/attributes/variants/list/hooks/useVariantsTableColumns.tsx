import { useMemo } from 'react';

import { routes } from '../../../../../common/constants/routes';
import { useCustomNavigate } from '../../../../../common/hooks';
import { useTranslation } from '../../../../../components/IntlProvider';
import {
  TableCellValueGetterProps,
  TableColumnGeneric,
} from '../../../../../components/Table';
import { VariantWithAttribute } from '../types';

type UseVariantsTableColumnsReturn = TableColumnGeneric<VariantWithAttribute>[];

type VariantWithAttributeValueGetterProps =
  TableCellValueGetterProps<VariantWithAttribute>;

export const useVariantsTableColumns = (): UseVariantsTableColumnsReturn => {
  const navigate = useCustomNavigate();
  const { translate } = useTranslation();

  return useMemo<TableColumnGeneric<VariantWithAttribute>[]>(
    () => [
      {
        title: translate('variant.name'),
        key: 'name',
        width: '40%',
        valueGetter: ({ item }: VariantWithAttributeValueGetterProps) =>
          item.name,
      },
      {
        title: translate('attribute.name'),
        key: 'attributeName',
        width: '35%',
        valueGetter: ({ item }: VariantWithAttributeValueGetterProps) => {
          return (
            <span
              onClick={(e) => {
                e.preventDefault();
                navigate(`${routes.attributes.root}/${item.attributeId}`);
              }}
            >
              {item.attributeName}
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
    ],
    [translate, navigate],
  );
};
