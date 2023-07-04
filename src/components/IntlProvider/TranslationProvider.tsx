import { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { createProvider } from '../../common/utils';
import { CONTEXT_NAME, translationContextValuesDefault } from './constants';
import {
  Language,
  TranslatePlaceholders,
  TranslationContextValue,
  TranslationProviderProps,
} from './types';

const [Provider, useTranslation] = createProvider<TranslationContextValue>({
  contextName: CONTEXT_NAME,
  contextDefaultValue: translationContextValuesDefault,
});

const TranslationProvider: FC<PropsWithChildren<TranslationProviderProps>> = ({
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

  const contextValue = useMemo<TranslationContextValue>(
    () => ({
      language,
      translate,
      changeLanguage,
    }),
    [language, translate, changeLanguage],
  );

  return <Provider value={contextValue}>{children}</Provider>;
};

export { TranslationProvider, useTranslation };
