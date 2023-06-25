import { useQueryParameters } from '../../../hooks';
import { LIMIT } from '../../../common/constants/filters';

type UsePaginationUrlProps = {
  url: string;
  limit: number;
};

type UsePaginationUrlReturn = string;

export const usePaginationUrl = ({
  url,
  limit,
}: UsePaginationUrlProps): UsePaginationUrlReturn => {
  const { queryParameters } = useQueryParameters();

  return queryParameters
    ? `${url}/?${LIMIT}=${limit}&${queryParameters}`
    : `${url}/?${LIMIT}=${limit}`;
};
