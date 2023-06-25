import { useEffect, useRef } from 'react';
import { useCachedAPI } from '../../../hooks';
import { endpoints } from '../../../common/constants/api';
import { useWarehouseProductsTableColumns } from './hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
  TablePagination,
} from '../../../components/Table';
import { WarehouseProduct, WarehouseProductTable } from './types';
import { TABLE_WAREHOUSE_PRODUCTS_ID } from './constants';
import { WarehouseProductsListItem } from './WarehouseProductsListItem';
import { tableRoles } from '../../../components/Table/constants';
import { PaginationData } from '../../../common/types/pagination';
import { getPaginationData } from '../../../utils';
import {
  usePaginationLimit,
  usePaginationUrl,
} from '../../../components/Pagination/hooks';
import classes from './styles/index.module.css';

export const WarehouseProductsList = () => {
  const isLoadedRef = useRef<boolean>(false);

  const { limitValue, setLimitValue } = usePaginationLimit();
  const GET_WAREHOUSE_PRODUCTS_URL = usePaginationUrl({
    url: endpoints.warehouseProducts.root,
    limit: limitValue,
  });

  const { data } = useCachedAPI<PaginationData<WarehouseProduct>>(
    GET_WAREHOUSE_PRODUCTS_URL,
    {
      // We have to disable "suspense" after first load
      // as "keepPreviousData" does not work with it
      suspense: !isLoadedRef.current,
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    isLoadedRef.current = true;
  }, []);

  const { data: list, total } = getPaginationData<WarehouseProduct>(data);

  const columns: TableColumnGeneric<WarehouseProductTable>[] =
    useWarehouseProductsTableColumns();

  return (
    <Table
      items={list}
      columns={columns}
      tableRole={tableRoles.treegrid}
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
        total > limitValue && (
          <TablePagination
            total={total}
            limitValue={limitValue}
            setLimitValue={setLimitValue}
          />
        )
      }
    />
  );
};
