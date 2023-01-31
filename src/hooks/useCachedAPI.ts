import useSWR from 'swr';
import { useAPI } from './useAPI';

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
  const { shouldFetch } = options;

  const fetchUrl = shouldFetch ? url : null;

  return useSWR<D | undefined>(fetchUrl, GET, {
    suspense: true,
    revalidateOnFocus: false,
    errorRetryCount: 0,
    shouldRetryOnError: false,
  });
};
