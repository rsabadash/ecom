import { useMemo } from 'react';

import { useTranslation } from '../../../components/IntlProvider';
import { TableColumnGeneric } from '../../../components/Table';
import { Supplier } from '../types';

type UseSuppliersTableColumnsReturn = TableColumnGeneric<Supplier>[];

export const useSuppliersTableColumns = (): UseSuppliersTableColumnsReturn => {
  const { translate } = useTranslation();

  return useMemo<TableColumnGeneric<Supplier>[]>(
    () => [
      {
        title: translate('supplier.name'),
        key: 'name',
        width: '30%',
        valueGetter: ({ value }: { value: string }) => value,
      },
      {
        title: translate('supplier.phone'),
        key: 'phoneNumber',
        width: '30%',
        valueGetter: ({ value }: { value: boolean }) => (value ? value : '-'),
      },
    ],
    [translate],
  );
};
