import { TranslationContextValue } from './types';
import { APPLICATION_NAME } from '../../common/constants/application';

export const LOCALE_STORAGE_KEY = `${APPLICATION_NAME}.locale`;

export const languages = {
  uk: 'uk',
  en: 'en',
} as const;

export const SUPPORTED_LANGUAGES = Object.values(languages);

export const DEFAULT_LANGUAGE = languages.uk;

export const localeToLanguageMap = {
  uk: languages.uk,
  'uk-UA': languages.uk,
  en: languages.en,
  'en-US': languages.en,
} as const;

export const translationContextValuesDefault: TranslationContextValue = {
  language: DEFAULT_LANGUAGE,
  translate: () => '',
  changeLanguage: () => undefined,
};
