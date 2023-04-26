import useSWR from 'swr';
import { useAPI } from './useAPI';
import { PublicConfiguration } from 'swr/_internal';

type UseCachedAPIOptions = Partial<
  Pick<PublicConfiguration, 'dedupingInterval'>
> & {
  shouldFetch?: boolean;
};

const defaultOptions: UseCachedAPIOptions = {
  shouldFetch: true,
};

export const useCachedAPI = <D>(
  url: string,
  options: UseCachedAPIOptions = {},
) => {
  const { GET } = useAPI();
  const { shouldFetch, ...config } = { ...defaultOptions, ...options };

  const fetchUrl = shouldFetch ? url : null;

  return useSWR<D | undefined>(fetchUrl, GET, {
    suspense: true,
    revalidateOnFocus: false,
    errorRetryCount: 0,
    shouldRetryOnError: false,
    ...config,
  });
};
