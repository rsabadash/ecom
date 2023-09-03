import { FC } from 'react';

import {
  usePaginationLimit,
  usePaginationLocalData,
  usePaginationQueryPage,
} from '../../../components/Pagination/hooks';
import {
  Table,
  TableColumnGeneric,
  TablePagination,
} from '../../../components/Table';
import { TABLE_SUPPLY_DETAIL_ID } from './constants';
import { useSupplyDetailTableColumns } from './hooks';
import { SupplyDetailListSummary } from './SupplyDetailListSummary';
import { SupplyDetailListProps, SupplyDetailProduct } from './types';

import classes from './styles/index.module.css';

export const SupplyDetailList: FC<SupplyDetailListProps> = ({
  products,
  productsTotalCost,
}) => {
  const { limitValue, setLimitValue } = usePaginationLimit();
  const page = usePaginationQueryPage();

  const { list, total } = usePaginationLocalData<SupplyDetailProduct>({
    page,
    list: products,
    limit: limitValue,
  });

  const columns: TableColumnGeneric<SupplyDetailProduct>[] =
    useSupplyDetailTableColumns();

  return (
    <Table
      items={list}
      columns={columns}
      tableRowRenderKey="productId"
      tableLabeledBy={TABLE_SUPPLY_DETAIL_ID}
      bottomPanelNode={
        <div className={classes.bottomPanelSupplyDetailListSummary}>
          <SupplyDetailListSummary
            columns={columns}
            productsTotalCost={productsTotalCost}
          />
          {total > limitValue && (
            <TablePagination
              total={total}
              limitValue={limitValue}
              setLimitValue={setLimitValue}
            />
          )}
        </div>
      }
    />
  );
};
