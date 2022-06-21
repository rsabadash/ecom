import { languages, localeToLanguageMap } from './constants';

export type Language = ValuesOfObject<typeof languages>;

export type Locale = keyof typeof localeToLanguageMap;

export type TranslationProviderProps = {
    language: Language;
    setLanguage: (language: Language) => void;
};

export type TranslateValue = string;
export type TranslatePlaceholders = Record<string, string>;
export type TranslateFn = (value: TranslateValue, placeholders?: TranslatePlaceholders) => string;

export type TranslationContextValue = {
    language: Language;
    translate: TranslateFn;
    changeLanguage: (language: Language) => void;
};