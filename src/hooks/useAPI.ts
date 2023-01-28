import { useMemo } from 'react';
import { GET, POST, PATCH, DELETE } from '../utils/api';
import { ApiServiceInterface } from '../services/apiService';

type UseAPI = () => ApiServiceInterface;

export const useAPI: UseAPI = () => {
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
