import { GET, GetAction, POST, PostAction, PATCH, PatchAction } from '../utils/api';

type UseAPIReturn = {
    GET: GetAction;
    POST: PostAction;
    PATCH: PatchAction;
};

export const useAPI = (): UseAPIReturn => {
    return {
        GET,
        POST,
        PATCH
    };
};