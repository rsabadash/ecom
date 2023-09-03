import { useCallback } from 'react';

import { createSupplyApi } from '../api';
import { SupplyPostData, SupplyPostResponse } from '../types';

type UseCreateSupplyReturn = {
  createSupply: (
    data: SupplyPostData,
  ) => Promise<SupplyPostResponse | undefined>;
};

export const useCreateSupply = (): UseCreateSupplyReturn => {
  const createSupply = useCallback(async (data: SupplyPostData) => {
    return await createSupplyApi(data);
  }, []);

  return { createSupply };
};
