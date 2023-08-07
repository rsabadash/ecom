import { FC, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { createProvider } from '../../common/utils';
import {
  CONTEXT_NAME,
  DEFAULT_LANGUAGE,
  translationContextValuesDefault,
} from './constants';
import {
  Language,
  TranslatePlaceholders,
  TranslationContextValue,
  TranslationProviderProps,
  Translations,
} from './types';

const [Provider, useTranslation] = createProvider<TranslationContextValue>({
  contextName: CONTEXT_NAME,
  contextDefaultValue: translationContextValuesDefault,
});

const TranslationProvider: FC<TranslationProviderProps> = ({
  language,
  setLanguage,
  children,
}) => {
  const { formatMessage } = useIntl();

  const changeLanguage = useCallback(
    (language: Language): void => {
      setLanguage(language);
    },
    [setLanguage],
  );

  const translate = useCallback(
    (value: string, placeholders?: TranslatePlaceholders): string => {
      return formatMessage({ id: value }, placeholders);
    },
    [formatMessage],
  );

  const getTranslationWithFallback = useCallback(
    (translations: Translations | undefined): string => {
      return translations
        ? translations[language] || translations[DEFAULT_LANGUAGE]
        : '';
    },
    [language],
  );

  const contextValue = useMemo<TranslationContextValue>(
    () => ({
      language,
      translate,
      changeLanguage,
      getTranslationWithFallback,
    }),
    [language, translate, changeLanguage, getTranslationWithFallback],
  );

  return <Provider value={contextValue}>{children}</Provider>;
};

export { TranslationProvider, useTranslation };
