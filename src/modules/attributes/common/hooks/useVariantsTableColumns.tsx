import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Translations,
  useTranslation,
} from '../../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../../components/Table';
import { Variant, VariantWithAttribute } from '../../attributes/types';
import { routes } from '../../../../common/constants/routes';

type UseVariantsTableColumns = (
  isDetailList: boolean,
) => (TableColumnGeneric<Variant> | TableColumnGeneric<VariantWithAttribute>)[];

export const useVariantsTableColumns: UseVariantsTableColumns = (
  isDetailList,
) => {
  const { translate, language } = useTranslation();
  const navigate = useNavigate();

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
        title: translate('attribute.name'),
        key: 'attributeName',
        width: '25%',
        isHidden: isDetailList,
        valueGetter: (value: Translations, item) => {
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
    [translate, isDetailList, language, navigate],
  );
};
