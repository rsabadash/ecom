import { useCallback } from 'react';

import { updateAttributeApi } from '../api';
import { AttributePatchData } from '../types';

type UseUpdateAttributeReturn = {
  updateAttribute: (data: AttributePatchData) => Promise<void>;
};

export const useUpdateAttribute = (): UseUpdateAttributeReturn => {
  const updateAttribute = useCallback(async (data: AttributePatchData) => {
    await updateAttributeApi(data);
  }, []);

  return { updateAttribute };
};
