import { endpoints } from '../../../common/constants/api';
import { useCachedPaginationAPI } from '../../../common/hooks';
import { usePaginationLimit } from '../../../components/Pagination/hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
  TablePagination,
} from '../../../components/Table';
import { TABLE_ROLES } from '../../../components/Table/constants';
import { WarehouseProduct } from '../common/types';
import { TABLE_WAREHOUSE_PRODUCTS_ID } from './constants';
import { useWarehouseProductsTableColumns } from './hooks';
import { WarehouseProductTable } from './types';
import { WarehouseProductsListItem } from './WarehouseProductsListItem';
import { WarehouseProductsListPlaceholder } from './WarehouseProductsListPlaceholder';

import classes from './styles/index.module.css';

export const WarehouseProductsList = () => {
  const { limitValue, setLimitValue } = usePaginationLimit();

  const { list, total } = useCachedPaginationAPI<WarehouseProduct>(
    endpoints.warehouseProducts.root,
    {
      limit: limitValue,
    },
  );

  const columns: TableColumnGeneric<WarehouseProductTable>[] =
    useWarehouseProductsTableColumns();

  return (
    <>
      {list.length > 0 ? (
        <Table
          items={list}
          columns={columns}
          tableRole={TABLE_ROLES.TREEGRID}
          tableLabeledBy={TABLE_WAREHOUSE_PRODUCTS_ID}
          tableBodyClassName={classes.warehouseList}
          rowCustomRender={({
            row,
            item,
            rowProps,
          }: RowCustomRenderProps<WarehouseProduct>) => (
            <WarehouseProductsListItem
              key={item._id}
              item={item}
              rowProps={rowProps}
            >
              {row}
            </WarehouseProductsListItem>
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
        <WarehouseProductsListPlaceholder />
      )}
    </>
  );
};
