import { LocalStorageService } from '../../services';
import { LOCALE_STORAGE_KEY } from './constants';
import { Language, Locale } from './types';
import { DEFAULT_LANGUAGE, localeToLanguageMap } from './constants';

export const isLocaleSupported = (locale: string): boolean => {
  return locale in localeToLanguageMap;
};

export const mapLocaleToLanguage = (locale: Locale): Language => {
  return localeToLanguageMap[locale];
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
