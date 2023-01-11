import { Language, TranslateFn } from '../IntlProvider';

export type AddLanguageToTranslationArgs = {
    translation: undefined | string;
    language: Language;
    translate: TranslateFn;
};

export type AddLanguageToTranslationReturn = undefined | string;