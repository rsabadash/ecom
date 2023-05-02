import { useMemo } from 'react';
import { useParseErrorMessage } from './useParseErrorMessage';
import { CustomError } from './useParseErrorMessage';

export type FormatError = (error: CustomError) => undefined | string;

type UseFieldErrorMessageProps = {
  error: CustomError | undefined;
  formatError?: FormatError;
};

type UseFieldErrorMessageReturn = string | undefined;

export const useFieldErrorMessage = ({
  error,
  formatError,
}: UseFieldErrorMessageProps): UseFieldErrorMessageReturn => {
  const { parseErrorMessage } = useParseErrorMessage();

  return useMemo(() => {
    if (error) {
      if (formatError) {
        return formatError(error);
      }

      return parseErrorMessage(error);
    }

    return undefined;
  }, [error, formatError, parseErrorMessage]);
};
