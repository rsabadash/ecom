import { PaginationData } from '../types/pagination';

type GetPaginationDataReturn<D> = {
  data: D[];
  total: number;
};

export const getPaginationData = <D>(
  paginationData: PaginationData<D> | undefined,
): GetPaginationDataReturn<D> => {
  return {
    data: paginationData?.data || [],
    total: paginationData?.metadata?.total || 0,
  };
};
