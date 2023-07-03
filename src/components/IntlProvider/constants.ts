import { TranslationContextValue } from './types';
import { APPLICATION_NAME } from '../../common/constants/application';

export const CONTEXT_NAME = 'TranslationContext';

export const LOCALE_STORAGE_KEY = `${APPLICATION_NAME}.locale`;

export const LANGUAGES = {
  uk: 'uk',
  en: 'en',
} as const;

export const SUPPORTED_LANGUAGES = Object.values(LANGUAGES);

export const DEFAULT_LANGUAGE = LANGUAGES.uk;

export const LOCALE_TO_LANGUAGE_MAP = {
  uk: LANGUAGES.uk,
  'uk-UA': LANGUAGES.uk,
  en: LANGUAGES.en,
  'en-US': LANGUAGES.en,
} as const;

export const translationContextValuesDefault: TranslationContextValue = {
  language: DEFAULT_LANGUAGE,
  translate: () => '',
  changeLanguage: () => undefined,
};
