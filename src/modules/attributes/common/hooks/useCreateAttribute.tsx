import { useCallback } from 'react';
import { AttributePostData, AttributePostResponse } from '../types';
import { createAttributeApi } from '../api';

type UseCreateAttributeReturn = {
  createAttribute: (
    data: AttributePostData,
  ) => Promise<AttributePostResponse | undefined>;
};

export const useCreateAttribute = (): UseCreateAttributeReturn => {
  const createAttribute = useCallback(async (data: AttributePostData) => {
    return await createAttributeApi(data);
  }, []);

  return { createAttribute };
};
