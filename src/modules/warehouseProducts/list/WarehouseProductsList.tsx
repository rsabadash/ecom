import { useCachedAPI } from '../../../hooks';
import { endpoints } from '../../../common/constants/api';
import { useWarehouseProductsTableColumns } from './hooks';
import {
  RowCustomRenderArgs,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { WarehouseProduct, WarehouseProductTable } from './types';
import { TABLE_WAREHOUSE_PRODUCTS_ID } from './constants';
import { WarehouseProductsListItem } from './WarehouseProductsListItem';
import classes from './styles/index.module.css';

export const WarehouseProductsList = () => {
  const { data = [] } = useCachedAPI<WarehouseProduct[]>(
    `${endpoints.warehouseProducts.root}`,
  );

  const columns: TableColumnGeneric<WarehouseProductTable>[] =
    useWarehouseProductsTableColumns();

  return (
    <Table
      items={data}
      columns={columns}
      tableLabeledBy={TABLE_WAREHOUSE_PRODUCTS_ID}
      tableClassName={classes.warehouseList}
      rowCustomRender={({
        row,
        item,
        rowProps,
      }: RowCustomRenderArgs<WarehouseProduct>) => (
        <WarehouseProductsListItem
          key={item._id}
          item={item}
          rowProps={rowProps}
        >
          {row}
        </WarehouseProductsListItem>
      )}
    />
  );
};
