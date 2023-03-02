import { useCallback } from 'react';
import { deleteAttributeApi } from '../api';

type UseDeleteAttribute = (id: string | undefined) => {
  deleteAttribute: () => Promise<void>;
};

export const useDeleteAttribute: UseDeleteAttribute = (
  id: string | undefined,
) => {
  const deleteAttribute = useCallback(async () => {
    if (id) {
      await deleteAttributeApi(id);
    }
  }, [id]);

  return { deleteAttribute };
};
