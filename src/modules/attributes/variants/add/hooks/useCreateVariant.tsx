import { useCallback } from 'react';

import { createVariantApi } from '../api';
import { VariantPostData, VariantPostResponse } from '../types';

type UseCreateAttributeVariantReturn = {
  createVariant: (
    data: VariantPostData,
  ) => Promise<VariantPostResponse | undefined>;
};

export const useCreateVariant = (): UseCreateAttributeVariantReturn => {
  const createVariant = useCallback(async (data: VariantPostData) => {
    return await createVariantApi(data);
  }, []);

  return { createVariant };
};
