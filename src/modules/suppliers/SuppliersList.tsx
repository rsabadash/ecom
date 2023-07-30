import { Link } from 'react-router-dom';

import { endpoints } from '../../common/constants/api';
import { routes } from '../../common/constants/routes';
import { useCachedAPI } from '../../common/hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
} from '../../components/Table';
import { TABLE_SUPPLIERS_ID } from './constants';
import { useSuppliersTableColumns } from './hooks';
import { SuppliersListPlaceholder } from './SuppliersListPlaceholder';
import { Supplier } from './types';

export const SuppliersList = () => {
  const { data = [] } = useCachedAPI<Supplier[]>(`${endpoints.suppliers.root}`);

  const columns: TableColumnGeneric<Supplier>[] = useSuppliersTableColumns();

  return (
    <>
      {data.length > 0 ? (
        <Table
          items={data}
          columns={columns}
          tableLabeledBy={TABLE_SUPPLIERS_ID}
          rowCustomRender={({
            row,
            item,
            rowProps,
          }: RowCustomRenderProps<Supplier>) => (
            <Link
              key={item._id}
              to={`${routes.suppliers.root}/${item._id}`}
              {...rowProps}
            >
              {row}
            </Link>
          )}
        />
      ) : (
        <SuppliersListPlaceholder />
      )}
    </>
  );
};
