import { useState } from 'react';

import { LIMIT } from '../../../common/constants/filters';
import { useQueryParameters } from '../../../common/hooks';
import { LIMIT_DEFAULT, LIMIT_ITEMS_DEFAULT } from '../constants';
import { Limit } from '../types';

type UsePaginationLimitProps = {
  initialLimit?: Limit;
};

type UsePaginationLimitReturn = {
  limitValue: Limit;
  setLimitValue: (limit: Limit) => void;
};

export const usePaginationLimit = ({
  initialLimit,
}: UsePaginationLimitProps = {}): UsePaginationLimitReturn => {
  const { getQueryParameter } = useQueryParameters();

  const [limitValue, setLimitValue] = useState<Limit>(
    initialLimit && LIMIT_ITEMS_DEFAULT.includes(initialLimit)
      ? initialLimit
      : (getQueryParameter(LIMIT) as unknown as Limit) || LIMIT_DEFAULT,
  );

  return {
    limitValue,
    setLimitValue,
  };
};
