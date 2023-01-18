import {
  GET,
  GetAction,
  POST,
  PostAction,
  PATCH,
  PatchAction,
  DELETE,
  DeleteAction,
} from '../utils/api';
import { useMemo } from 'react';

type UseAPIReturn = {
  GET: GetAction;
  POST: PostAction;
  PATCH: PatchAction;
  DELETE: DeleteAction;
};

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
