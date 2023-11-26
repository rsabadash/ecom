import { LIMIT } from '../../../common/constants/filters';
import { useQueryParameters } from '../../../common/hooks';

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

  // /api/v1/entity?key=value
  const queryParamsFromUrl = url.split('?')[1];

  // /api/v1/entity?key=value&limit=10
  // or
  // /api/v1/entity?limit=10
  const urlWithLimit = queryParamsFromUrl
    ? `${url}&${LIMIT}=${limit}`
    : `${url}?${LIMIT}=${limit}`;

  return queryParameters ? `${urlWithLimit}&${queryParameters}` : urlWithLimit;
};
