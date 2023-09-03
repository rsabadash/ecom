import { useMemo } from 'react';

import { ApiServiceInterface } from '../services/apiService';
import { DELETE, GET, PATCH, POST } from '../utils/api';

type UseAPIReturn = ApiServiceInterface;

export const useAPI = (): UseAPIReturn => {
  return useMemo(
    () => ({
      GET,
      POST,
      PATCH,
      DELETE,
    }),
    [],
  );
};
