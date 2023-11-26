import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

import { useAPI } from './useAPI';

export type UseCachedAPIOptions<D> = Partial<
  Pick<
    PublicConfiguration<D>,
    'dedupingInterval' | 'suspense' | 'keepPreviousData' | 'fallbackData'
  >
> & {
  shouldFetch?: boolean;
};

const defaultOptions: UseCachedAPIOptions<any> = {
  shouldFetch: true,
  suspense: true,
  keepPreviousData: false,
  fallbackData: undefined,
};

export const useCachedAPI = <D>(
  url: string,
  options: UseCachedAPIOptions<D> = {},
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
