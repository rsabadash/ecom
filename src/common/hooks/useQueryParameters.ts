import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type QueryParameterKey = string;

type QueryParametersArgs = {
  [key: QueryParameterKey]: string;
};

export const useQueryParameters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
    rawQueryParameters: searchParams,
    queryParameters: searchParams.toString(),
    addQueryParameters,
    deleteQueryParameters,
  };
};
