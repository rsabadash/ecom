import { FC } from 'react';
import {
  INITIAL_PAGE,
  LIMIT_ITEMS_DEFAULT,
  Pagination,
  PaginationLimit,
} from '../../../components/Pagination';
import { useQueryParameters } from '../../../hooks';
import { PAGE } from '../../../common/constants/filters';
import { WarehouseProductsListPaginationProps } from './types';
import classes from './styles/index.module.css';

export const WarehouseProductsListPagination: FC<
  WarehouseProductsListPaginationProps
> = ({ total, limitValue, setLimitValue }) => {
  const { queryParameters, rawQueryParameters } = useQueryParameters();

  const initialPage = parseInt(
    rawQueryParameters.get(PAGE) || INITIAL_PAGE.toString(),
  );

  return (
    <div className={classes.warehouseListPaginationBlock}>
      <PaginationLimit
        items={LIMIT_ITEMS_DEFAULT}
        value={limitValue}
        onLimitChange={setLimitValue}
      />
      <Pagination
        limit={limitValue}
        total={total}
        initialPage={initialPage}
        queryParameters={queryParameters}
        paginationClassName={classes.warehouseListPagination}
      />
    </div>
  );
};
