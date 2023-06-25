import { FC } from 'react';
import {
  INITIAL_PAGE,
  LIMIT_ITEMS_DEFAULT,
  Pagination,
  PaginationLimit,
} from '../Pagination';
import { useQueryParameters } from '../../hooks';
import { PAGE } from '../../common/constants/filters';
import { TablePaginationProps } from './types';
import classes from './styles/index.module.css';

export const TablePagination: FC<TablePaginationProps> = ({
  total,
  limitValue,
  setLimitValue,
}) => {
  const { queryParameters, rawQueryParameters } = useQueryParameters();

  const initialPage = parseInt(
    rawQueryParameters.get(PAGE) || INITIAL_PAGE.toString(),
  );

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
