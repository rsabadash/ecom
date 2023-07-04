import { useMemo } from 'react';

import { PAGE } from '../../../common/constants/filters';
import { useQueryParameters } from '../../../common/hooks';
import { INITIAL_PAGE } from '../constants';

export const usePaginationQueryPage = () => {
  const { rawQueryParameters } = useQueryParameters();

  return useMemo(() => {
    return parseInt(rawQueryParameters.get(PAGE) || INITIAL_PAGE.toString());
  }, [rawQueryParameters]);
};
