import { useCallback } from 'react';
import useSWR from 'swr';
import { useAPI } from './useAPI';
import { useAuth } from '../components/AuthProvider';
import { messages } from '../common/constants/errors';
import { ApiError } from '../services/apiService';

type UseCachedAPIOptions = {
  shouldFetch?: boolean;
};

const defaultOptions: UseCachedAPIOptions = {
  shouldFetch: true,
};

export const useCachedAPI = <D>(
  url: string,
  options: UseCachedAPIOptions = defaultOptions,
) => {
  const { GET } = useAPI();
  const { signOut } = useAuth();
  const { shouldFetch } = options;

  const fetchUrl = shouldFetch ? url : null;

  const fetcher = useCallback(
    async (url: string) => {
      return await GET<D>(url, {
        onError: (error: ApiError) => {
          if (error.message.toLowerCase() === messages.jwt.malformed) {
            signOut();
          }
        },
      });
    },
    [GET, signOut],
  );

  return useSWR<D | undefined>(fetchUrl, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    errorRetryCount: 0,
    shouldRetryOnError: false,
  });
};
