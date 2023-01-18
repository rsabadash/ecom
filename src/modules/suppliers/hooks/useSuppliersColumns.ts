import { TableColumnGeneric } from '../../../components/Table';
import { Supplier } from '../types';
import { useTranslation } from '../../../components/IntlProvider';
import { useMemo } from 'react';

export const useSuppliersColumns = (): TableColumnGeneric<Supplier>[] => {
  const { translate } = useTranslation();

  return useMemo(
    () => [
      {
        title: translate('suppliers.name'),
        key: 'name',
        width: '30%',
        valueGetter: (value: string) => value,
      },
      {
        title: translate('suppliers.account'),
        key: 'accountId',
        width: '30%',
        valueGetter: (value: boolean) => (value ? value : '-'),
      },
      {
        title: translate('suppliers.phone'),
        key: 'phoneNumber',
        width: '30%',
        valueGetter: (value: boolean) => (value ? value : '-'),
      },
    ],
    [translate],
  );
};
