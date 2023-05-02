import { useCallback } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from '../../IntlProvider';
import { ObjectErrorMessageProps } from '../utils/objectErrorMessage';

export type CustomErrorMessage = ObjectErrorMessageProps;

type DirectMessageError = Omit<FieldError, 'message'> & {
  message?: string | CustomErrorMessage;
};

type ErrorShape = {
  [key: string]: DirectMessageError;
};

export type CustomError = DirectMessageError | ErrorShape;

type UseParseErrorMessageReturn = {
  parseErrorMessage: (error: CustomError) => string | undefined;
};

export const useParseErrorMessage = (): UseParseErrorMessageReturn => {
  const { translate } = useTranslation();

  const parseErrorMessage = useCallback(
    (error: CustomError): string | undefined => {
      if (error) {
        if (error.message) {
          const { message } = error;

          if (typeof message === 'string') {
            return translate(message);
          }

          if ('translationKey' in message) {
            return translate(message.translationKey, {
              value: String(message.placeholderValue),
            });
          }
        }

        const errorKeys = Object.keys(error);

        if (errorKeys.length > 0 && !error.type && !error.message) {
          const firstErrorKey = errorKeys[0];
          const typedError = error as ErrorShape;
          const firstError = typedError[firstErrorKey];

          if (firstError) {
            return parseErrorMessage(firstError);
          }
        }
      }

      return undefined;
    },
    [translate],
  );

  return {
    parseErrorMessage,
  };
};
