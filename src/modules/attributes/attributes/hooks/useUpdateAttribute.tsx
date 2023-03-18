import { useCallback } from 'react';
import { AttributePatchData } from '../types';
import { updateAttributeApi } from '../api';

type UseUpdateAttributeReturn = {
  updateAttribute: (data: AttributePatchData) => Promise<void>;
};

export const useUpdateAttribute = (): UseUpdateAttributeReturn => {
  const updateAttribute = useCallback(async (data: AttributePatchData) => {
    await updateAttributeApi(data);
  }, []);

  return { updateAttribute };
};
