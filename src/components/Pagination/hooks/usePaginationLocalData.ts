import { useMemo } from 'react';

type UsePaginationLocalDataProps<L> = {
  list: L[];
  page: number;
  limit: number;
};

type UsePaginationLocalDataReturn<L> = {
  list: L[];
  total: number;
};

export const usePaginationLocalData = <L>({
  list,
  page,
  limit,
}: UsePaginationLocalDataProps<L>): UsePaginationLocalDataReturn<L> => {
  const offset = limit * (page - 1);

  const paginatedItems = useMemo(
    () => list.slice(offset, limit * page),
    [limit, list, offset, page],
  );

  return {
    list: paginatedItems,
    total: list.length,
  };
};
