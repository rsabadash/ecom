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

// TODO typed translations
// export const useTranslationT = <K extends string>() => {
//   const contextValues = useTranslation();
//
//   const translate = (
//     value: K,
//     placeholders?: TranslatePlaceholders,
//   ): string => {
//     return contextValues.translate(value, placeholders);
//   };
//
//   return {
//     ...contextValues,
//     translate,
//   };
// };

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

  const getTranslationByLanguage = useCallback(
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
      getTranslationByLanguage,
    }),
    [language, translate, changeLanguage, getTranslationByLanguage],
  );

  return <Provider value={contextValue}>{children}</Provider>;
};

export { TranslationProvider, useTranslation };
