import useSWR from 'swr'
import { useAPI } from './useAPI';

type UseCachedAPIOptions = {
    shouldFetch?: boolean;
};

const defaultOptions: UseCachedAPIOptions = {
    shouldFetch: true
};

export const useCachedAPI = <D>(url: string, options: UseCachedAPIOptions = defaultOptions) => {
    const { GET } = useAPI();
    const fetchUrl = options.shouldFetch ? { url } : null;

    return useSWR<D>(
        fetchUrl,
        GET,
        {
            suspense: true,
            revalidateOnFocus: false
        }
    );
};