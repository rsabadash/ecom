import { useCallback } from 'react';
import { AttributePostData, AttributePostResponse } from '../types';
import { createAttributeApi } from '../api';

type UseCreateAttributeProps = () => {
  createAttribute: (
    data: AttributePostData,
  ) => Promise<AttributePostResponse | undefined>;
};

export const useCreateAttribute: UseCreateAttributeProps = () => {
  const createAttribute = useCallback(async (data: AttributePostData) => {
    return await createAttributeApi(data);
  }, []);

  return { createAttribute };
};
