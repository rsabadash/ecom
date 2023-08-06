import { useEffect, useRef } from 'react';

import { usePaginationUrl } from '../../components/Pagination/hooks';
import { Limit } from '../../components/Pagination/types';
import { PaginationData } from '../types/pagination';
import { getPaginationData } from '../utils';
import { GetPaginationDataReturn } from '../utils/getPaginationData';
import { useCachedAPI } from './useCachedAPI';

type UseCachedPaginationAPIProps = {
  url: string;
  limit: Limit;
};

type UseCachedPaginationAPIReturn<Entity> = Omit<
  GetPaginationDataReturn<Entity>,
  'data'
> & {
  list: Entity[];
};

export const useCachedPaginationAPI = <Entity>({
  url,
  limit,
}: UseCachedPaginationAPIProps): UseCachedPaginationAPIReturn<Entity> => {
  const isLoadedRef = useRef<boolean>(false);

  const GET_ENTITY_URL = usePaginationUrl({
    url,
    limit,
  });

  const { data } = useCachedAPI<PaginationData<Entity>>(GET_ENTITY_URL, {
    // We have to disable "suspense" after first load
    // as "keepPreviousData" does not work with it
    suspense: !isLoadedRef.current,
    keepPreviousData: true,
  });

  useEffect(() => {
    isLoadedRef.current = true;
  }, []);

  const { data: list, total } = getPaginationData<Entity>(data);

  return {
    list,
    total,
  };
};
