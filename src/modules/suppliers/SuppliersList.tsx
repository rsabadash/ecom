import { Link } from 'react-router-dom';
import { TABLE_SUPPLIERS_ID } from './constants';
import {
  RowCustomRenderArgs,
  Table,
  TableColumnGeneric,
} from '../../components/Table';
import { Supplier } from './types';
import { routes } from '../../common/constants/routes';
import { useSuppliersTableColumns } from './hooks';
import { useCachedAPI } from '../../hooks';
import { endpoints } from '../../common/constants/api';

export const SuppliersList = () => {
  const { data = [] } = useCachedAPI<Supplier[]>(`${endpoints.suppliers.root}`);

  const columns: TableColumnGeneric<Supplier>[] = useSuppliersTableColumns();

  return (
    <Table
      isRowLinkInteractive
      items={data}
      columns={columns}
      tableLabeledBy={TABLE_SUPPLIERS_ID}
      rowCustomRender={({
        row,
        item,
        rowProps,
      }: RowCustomRenderArgs<Supplier>) => (
        <Link
          key={item._id}
          to={`${routes.suppliers.root}/${item._id}`}
          {...rowProps}
        >
          {row}
        </Link>
      )}
    />
  );
};
