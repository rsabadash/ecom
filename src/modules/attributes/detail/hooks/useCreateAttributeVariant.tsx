import {
  AttributeVariantPostResponse,
  AttributeVariantPostData,
} from '../types';
import { useCallback } from 'react';
import { createAttributeVariantApi } from '../api';

type UseCreateAttributeVariantProps = () => {
  createAttributeVariant: (
    data: AttributeVariantPostData,
  ) => Promise<AttributeVariantPostResponse | undefined>;
};

export const useCreateAttributeVariant: UseCreateAttributeVariantProps = () => {
  const createAttributeVariant = useCallback(
    async (data: AttributeVariantPostData) => {
      return await createAttributeVariantApi(data);
    },
    [],
  );

  return { createAttributeVariant };
};
