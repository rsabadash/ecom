import { useCallback } from 'react';

import { useTranslation } from '../../components/IntlProvider';

type UseIntlCurrencyReturn = {
  formatCurrency: (value: string | number) => string;
};

export const useIntlCurrency = (): UseIntlCurrencyReturn => {
  const { language } = useTranslation();

  const formatCurrency = useCallback(
    (value: string | number): string => {
      return new Intl.NumberFormat(language, {
        style: 'currency',
        currency: 'UAH',
      }).format(Number(value));
    },
    [language],
  );

  return {
    formatCurrency,
  };
};
