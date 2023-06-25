import { useState } from 'react';
import { LIMIT_DEFAULT } from '../constants';

type UsePaginationLimitProps = {
  initialLimit?: number;
};

type UsePaginationLimitReturn = {
  limitValue: number;
  setLimitValue: (limit: number) => void;
};

export const usePaginationLimit = ({
  initialLimit,
}: UsePaginationLimitProps = {}): UsePaginationLimitReturn => {
  const [limitValue, setLimitValue] = useState<number>(
    initialLimit || LIMIT_DEFAULT,
  );

  return {
    limitValue,
    setLimitValue,
  };
};
