import { useCallback } from 'react';
import {
  DEFAULT_LANGUAGE,
  Translations,
  useTranslation,
} from '../../components/IntlProvider';

type UseTranslationWithFallbackReturn = {
  translationWithFallback: (translations: Translations) => string;
};

export const useTranslationWithFallback =
  (): UseTranslationWithFallbackReturn => {
    const { language } = useTranslation();

    const translationWithFallback = useCallback(
      (translations: Translations) => {
        return translations[language] || translations[DEFAULT_LANGUAGE];
      },
      [language],
    );

    return {
      translationWithFallback,
    };
  };
