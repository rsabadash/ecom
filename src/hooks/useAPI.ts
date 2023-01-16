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

type UseAPIReturn = {
  GET: GetAction;
  POST: PostAction;
  PATCH: PatchAction;
  DELETE: DeleteAction;
};

export const useAPI = (): UseAPIReturn => {
  return {
    GET,
    POST,
    PATCH,
    DELETE,
  };
};
