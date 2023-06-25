import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  usePaginationLimit,
  usePaginationUrl,
} from '../../../components/Pagination/hooks';
import { endpoints } from '../../../common/constants/api';
import { useCachedAPI } from '../../../hooks';
import { PaginationData } from '../../../common/types/pagination';
import { getPaginationData } from '../../../utils';
import { Supply } from './types';
import { useSuppliesTableColumns } from './hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
  TablePagination,
} from '../../../components/Table';
import { TABLE_SUPPLIES_ID } from './constants';
import { routes } from '../../../common/constants/routes';

export const SuppliesList = () => {
  const isLoadedRef = useRef<boolean>(false);

  const { limitValue, setLimitValue } = usePaginationLimit();
  const GET_SUPPLIES_URL = usePaginationUrl({
    url: endpoints.supplies.root,
    limit: limitValue,
  });

  const { data } = useCachedAPI<PaginationData<Supply>>(GET_SUPPLIES_URL, {
    // We have to disable "suspense" after first load
    // as "keepPreviousData" does not work with it
    suspense: !isLoadedRef.current,
    keepPreviousData: true,
  });

  useEffect(() => {
    isLoadedRef.current = true;
  }, []);

  const { data: list, total } = getPaginationData<Supply>(data);

  const columns: TableColumnGeneric<Supply>[] = useSuppliesTableColumns();

  return (
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
