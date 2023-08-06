import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type QueryParameterKey = string;

type QueryParametersArgs = {
  [key: QueryParameterKey]: string;
};

type UseQueryParametersReturn = {
  queryParameters: string;
  rawQueryParameters: URLSearchParams;
  getQueryParameter: (key: QueryParameterKey) => string | null;
  addQueryParameters: (parameters: QueryParametersArgs) => void;
  deleteQueryParameters: (
    parameters: QueryParametersArgs | QueryParameterKey,
  ) => void;
};

export const useQueryParameters = (): UseQueryParametersReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParameter = useCallback(
    (key: QueryParameterKey): string | null => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const addQueryParameters = useCallback(
    (parameters: QueryParametersArgs): void => {
      setSearchParams((prevSearchParams) => {
        for (const parameter in parameters) {
          prevSearchParams.set(parameter, parameters[parameter]);
        }

        return prevSearchParams;
      });
    },
    [setSearchParams],
  );

  const deleteQueryParameters = useCallback(
    (parameters: QueryParametersArgs | QueryParameterKey): void => {
      setSearchParams((prevSearchParams) => {
        if (typeof parameters === 'string') {
          prevSearchParams.delete(parameters);
        } else {
          for (const parameter in parameters) {
            prevSearchParams.delete(parameter);
          }
        }

        return prevSearchParams;
      });
    },
    [setSearchParams],
  );

  return {
    queryParameters: searchParams.toString(),
    rawQueryParameters: searchParams,
    getQueryParameter,
    addQueryParameters,
    deleteQueryParameters,
  };
};
