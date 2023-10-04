import { LocalStorageService } from '../../common/services';
import {
  DEFAULT_LANGUAGE,
  LOCALE_STORAGE_KEY,
  LOCALE_TO_LANGUAGE_MAP,
} from './constants';
import { Language, Locale } from './types';

export const isLocaleSupported = (locale: string): boolean => {
  return locale in LOCALE_TO_LANGUAGE_MAP;
};

export const mapLocaleToLanguage = (locale: Locale): Language => {
  return LOCALE_TO_LANGUAGE_MAP[locale];
};

export const getLanguageByLocale = (locale: string): Language | null => {
  const isSupported = isLocaleSupported(locale);

  if (isSupported) {
    return mapLocaleToLanguage(locale as Locale);
  }

  return null;
};

export const defineUserLanguageByLocale = (): Language => {
  let locale = LocalStorageService.getItem<Language>(LOCALE_STORAGE_KEY);

  if (!locale) {
    locale = getLanguageByLocale(window.navigator.language);

    if (!locale && window.navigator.languages) {
      const locales = window.navigator.languages;
      const localeIndex = locales.findIndex((l) => getLanguageByLocale(l));

      if (localeIndex === -1) {
        locale = getLanguageByLocale(locales[localeIndex]);
      }
    }
  }

  return locale || DEFAULT_LANGUAGE;
};
