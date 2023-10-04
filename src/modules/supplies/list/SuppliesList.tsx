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
import { Supply } from '../common/types';
import { TABLE_SUPPLIES_ID } from './constants';
import { useSuppliesTableColumns } from './hooks';
import { SuppliesListPlaceholder } from './SuppliesListPlaceholder';

export const SuppliesList = () => {
  const { limitValue, setLimitValue } = usePaginationLimit();

  const { list, total } = useCachedPaginationAPI<Supply>({
    url: endpoints.supplies.root,
    limit: limitValue,
  });

  const columns: TableColumnGeneric<Supply>[] = useSuppliesTableColumns();

  return (
    <>
      {list.length > 0 ? (
        <Table
          items={list}
          columns={columns}
          tableLabeledBy={TABLE_SUPPLIES_ID}
          rowCustomRender={({
            row,
            item,
            rowProps,
          }: RowCustomRenderProps<Supply>) => (
            <Link
              key={item._id}
              to={`${routes.supplies.root}/${item._id}`}
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
        <SuppliesListPlaceholder />
      )}
    </>
  );
};
