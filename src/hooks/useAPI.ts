import { useMemo } from 'react';
import { GET, POST, PATCH, DELETE } from '../utils/api';
import { ApiServiceInterface } from '../services/apiService';

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
