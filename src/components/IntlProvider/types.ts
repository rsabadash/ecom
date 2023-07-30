import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LOCALE_TO_LANGUAGE_MAP,
} from './constants';

export type Language = ValuesOfObject<typeof LANGUAGES>;

export type Locale = keyof typeof LOCALE_TO_LANGUAGE_MAP;

export type DefaultLanguage = typeof DEFAULT_LANGUAGE;

export type TranslationRequired = {
  [key in DefaultLanguage]: string;
};

export type TranslationsOptional = {
  [key in Language]?: string;
};

export type Translations = TranslationRequired & TranslationsOptional;

export type TranslationsAllRequired = Required<Translations>;

export type TranslationProviderProps = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export type TranslateMessage = string;
export type TranslatePlaceholders = Record<string, string | number>;
export type TranslateFn = (
  value: TranslateMessage,
  placeholders?: TranslatePlaceholders,
) => string;

export type TranslationContextValue = {
  language: Language;
  translate: TranslateFn;
  changeLanguage: (language: Language) => void;
};
