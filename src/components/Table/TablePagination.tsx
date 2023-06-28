import { FC } from 'react';
import {
  LIMIT_ITEMS_DEFAULT,
  Pagination,
  PaginationLimit,
} from '../Pagination';
import { useQueryParameters } from '../../hooks';
import { TablePaginationProps } from './types';
import { usePaginationQueryPage } from '../Pagination/hooks';
import classes from './styles/index.module.css';

export const TablePagination: FC<TablePaginationProps> = ({
  total,
  limitValue,
  setLimitValue,
}) => {
  const initialPage = usePaginationQueryPage();
  const { queryParameters } = useQueryParameters();

  return (
    <div className={classes.table__paginationBlock}>
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
        paginationClassName={classes.table__Pagination}
      />
    </div>
  );
};
