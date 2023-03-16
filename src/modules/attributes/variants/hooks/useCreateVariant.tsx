import { useCallback } from 'react';
import { VariantPostResponse, VariantPostData } from '../types';
import { createVariantApi } from '../api';

type UseCreateAttributeVariantProps = () => {
  createVariant: (
    data: VariantPostData,
  ) => Promise<VariantPostResponse | undefined>;
};

export const useCreateVariant: UseCreateAttributeVariantProps = () => {
  const createVariant = useCallback(async (data: VariantPostData) => {
    return await createVariantApi(data);
  }, []);

  return { createVariant };
};
