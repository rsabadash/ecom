import { Link } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import { routes } from '../../../common/constants/routes';
import { useCachedPaginationAPI } from '../../../common/hooks';
import { usePaginationLimit } from '../../../components/Pagination/hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
  TablePagination,
} from '../../../components/Table';
import { Supplier } from '../common/types';
import { TABLE_SUPPLIERS_ID } from './constants';
import { useSuppliersTableColumns } from './hooks';
import { SuppliersListPlaceholder } from './SuppliersListPlaceholder';

export const SuppliersList = () => {
  const { limitValue, setLimitValue } = usePaginationLimit();

  const { list, total } = useCachedPaginationAPI<Supplier>({
    url: endpoints.suppliers.root,
    limit: limitValue,
  });

  const columns: TableColumnGeneric<Supplier>[] = useSuppliersTableColumns();

  return (
    <>
      {list.length > 0 ? (
        <Table
          items={list}
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
          bottomPanelNode={
            <TablePagination
              total={total}
              limitValue={limitValue}
              setLimitValue={setLimitValue}
            />
          }
        />
      ) : (
        // TODO if total > 0 we have to show 404 not the component bellow
        <SuppliersListPlaceholder />
      )}
    </>
  );
};
