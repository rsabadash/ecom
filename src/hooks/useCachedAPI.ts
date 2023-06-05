import useSWR from 'swr';
import { useAPI } from './useAPI';
import { PublicConfiguration } from 'swr/_internal';

type UseCachedAPIOptions = Partial<
  Pick<
    PublicConfiguration,
    'dedupingInterval' | 'suspense' | 'keepPreviousData'
  >
> & {
  shouldFetch?: boolean;
};

const defaultOptions: UseCachedAPIOptions = {
  shouldFetch: true,
  suspense: true,
  keepPreviousData: false,
};

export const useCachedAPI = <D>(
  url: string,
  options: UseCachedAPIOptions = {},
) => {
  const { GET } = useAPI();
  const { shouldFetch, ...config } = { ...defaultOptions, ...options };

  const fetchUrl = shouldFetch ? url : null;

  return useSWR<D | undefined>(fetchUrl, GET, {
    revalidateOnFocus: false,
    errorRetryCount: 0,
    shouldRetryOnError: false,
    ...config,
  });
};
