import { useMemo } from 'react';
import { TableColumnGeneric } from '../../../components/Table';
import { Supplier } from '../types';
import { useTranslation } from '../../../components/IntlProvider';

type UseSuppliersTableColumnsReturn = TableColumnGeneric<Supplier>[];

export const useSuppliersTableColumns = (): UseSuppliersTableColumnsReturn => {
  const { translate } = useTranslation();

  return useMemo<TableColumnGeneric<Supplier>[]>(
    () => [
      {
        title: translate('supplier.name'),
        key: 'name',
        width: '50%',
        valueGetter: ({ value }: { value: string }) => value,
      },
      {
        title: translate('supplier.phone'),
        key: 'phoneNumber',
        width: '50%',
        valueGetter: ({ value }: { value: string }) => value,
      },
    ],
    [translate],
  );
};
