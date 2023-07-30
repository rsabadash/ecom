import { useCallback } from 'react';

import { createAttributeApi } from '../api';
import { AttributePostData, AttributePostResponse } from '../types';

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
