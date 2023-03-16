import { useCallback } from 'react';
import { AttributePatchData } from '../types';
import { updateAttributeApi } from '../api';

type UseUpdateAttribute = () => {
  updateAttribute: (data: AttributePatchData) => Promise<void>;
};

export const useUpdateAttribute: UseUpdateAttribute = () => {
  const updateAttribute = useCallback(async (data: AttributePatchData) => {
    await updateAttributeApi(data);
  }, []);

  return { updateAttribute };
};
