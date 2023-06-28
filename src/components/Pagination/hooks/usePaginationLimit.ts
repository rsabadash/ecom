import { useState } from 'react';
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
  const [limitValue, setLimitValue] = useState<Limit>(
    initialLimit && LIMIT_ITEMS_DEFAULT.includes(initialLimit)
      ? initialLimit
      : LIMIT_DEFAULT,
  );

  return {
    limitValue,
    setLimitValue,
  };
};
