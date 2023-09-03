import { useCallback } from 'react';

import { deleteAttributeApi } from '../api';

type UseDeleteAttributeReturn = {
  deleteAttribute: () => Promise<void>;
};

export const useDeleteAttribute = (
  id: string | undefined,
): UseDeleteAttributeReturn => {
  const deleteAttribute = useCallback(async () => {
    if (id) {
      await deleteAttributeApi(id);
    }
  }, [id]);

  return { deleteAttribute };
};
