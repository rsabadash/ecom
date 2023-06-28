import { useCallback } from 'react';
import { useTranslation } from '../components/IntlProvider';

type UseIntlDateReturn = {
  formatDate: (value: string | Date, options?: FormatDateOptions) => string;
};

type FormatDateOptions = {
  showTime?: boolean;
};

export const useIntlDate = (): UseIntlDateReturn => {
  const { language } = useTranslation();

  const formatDate = useCallback(
    (value: string | Date, { showTime }: FormatDateOptions = {}): string => {
      const date: Date = typeof value === 'string' ? new Date(value) : value;

      const dateIntl = new Intl.DateTimeFormat(language, {
        dateStyle: 'short',
        timeStyle: showTime ? 'short' : undefined,
        hour12: false,
      });

      return dateIntl.format(date);
    },
    [language],
  );

  return {
    formatDate,
  };
};
