import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { LocalStorageService } from '../../common/services';
import { translations } from '../../i18n';
import { DEFAULT_LANGUAGE, LOCALE_STORAGE_KEY } from './constants';
import { TranslationProvider } from './TranslationProvider';
import { Language } from './types';
import { defineUserLanguageByLocale } from './utils';

const userLanguage = defineUserLanguageByLocale();

export const CustomIntlProvider: FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(userLanguage);

  useEffect(() => {
    LocalStorageService.setItem<Language>(LOCALE_STORAGE_KEY, language);
    document?.querySelector('html')?.setAttribute('lang', language);
  }, [language]);

  return (
    <IntlProvider
      locale={language}
      messages={translations[language]}
      defaultLocale={DEFAULT_LANGUAGE}
    >
      <TranslationProvider language={language} setLanguage={setLanguage}>
        {children}
      </TranslationProvider>
    </IntlProvider>
  );
};
