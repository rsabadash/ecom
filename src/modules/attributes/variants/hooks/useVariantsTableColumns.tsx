import { useMemo } from 'react';
import {
  Translations,
  useTranslation,
} from '../../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../../components/Table';
import { Variant, VariantWithAttribute } from '../types';
import { routes } from '../../../../common/constants/routes';
import { useCustomNavigate } from '../../../../common/hooks';

type UseVariantsTableColumnsReturn = TableColumnGeneric<VariantWithAttribute>[];

export const useVariantsTableColumns = (): UseVariantsTableColumnsReturn => {
  const navigate = useCustomNavigate();
  const { translate, language } = useTranslation();

  return useMemo<
    (TableColumnGeneric<Variant> | TableColumnGeneric<VariantWithAttribute>)[]
  >(
    () => [
      {
        title: translate('attribute.variant.name'),
        key: 'name',
        width: '25%',
        valueGetter: ({ value }: { value: Translations }) => {
          return value[language];
        },
      },
      {
        title: translate('attribute.name'),
        key: 'attributeName',
        width: '25%',
        valueGetter: ({
          value,
          item,
        }: {
          value: Translations;
          item: VariantWithAttribute;
        }) => {
          return (
            <span
              onClick={(e) => {
                e.preventDefault();
                navigate(`${routes.attributes.root}/${item.attributeId}`);
              }}
            >
              {value[language]}
            </span>
          );
        },
      },
      {
        title: translate('attribute.state'),
        key: 'isActive',
        width: '25%',
        valueGetter: ({ value }: { value: boolean }) => {
          return value
            ? translate('attribute.state.active')
            : translate('attribute.state.inactive');
        },
      },
      {
        title: translate('sortOrder'),
        key: 'sortOrder',
        width: '25%',
        valueGetter: ({ value }: { value: number }) => {
          return value;
        },
      },
    ],
    [translate, language, navigate],
  );
};
