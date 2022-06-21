import { GET, GetAction, POST, PostAction } from '../utils/api';

type UseAPIReturn = {
    GET: GetAction;
    POST: PostAction;
};

export const useAPI = (): UseAPIReturn => {
    return {
        GET,
        POST
    };
};