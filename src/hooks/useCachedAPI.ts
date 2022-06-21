import useSWR from 'swr'
import { useAPI } from './useAPI';

export const useCachedAPI = <D>(url: string) => {
    const { GET } = useAPI();

    return useSWR<D>(
        { url },
        GET,
        {
            suspense: true,
            revalidateOnFocus: false
        }
    );
};