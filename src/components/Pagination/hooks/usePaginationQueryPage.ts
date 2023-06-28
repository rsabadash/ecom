import { PAGE } from '../../../common/constants/filters';
import { INITIAL_PAGE } from '../constants';
import { useQueryParameters } from '../../../hooks';
import { useMemo } from 'react';

export const usePaginationQueryPage = () => {
  const { rawQueryParameters } = useQueryParameters();

  return useMemo(() => {
    return parseInt(rawQueryParameters.get(PAGE) || INITIAL_PAGE.toString());
  }, [rawQueryParameters]);
};
