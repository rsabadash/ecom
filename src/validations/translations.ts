import * as yup from 'yup'
import { Translations, TranslationsAllRequired } from '../components/IntlProvider';

export const allTranslationsRequired = (translations: TranslationsAllRequired) => ({
    uk: yup.string().nullable().required(translations.uk),
    en: yup.string().nullable().required(translations.en)
});

export const mainTranslationRequired = (translation: Translations) => ({
    uk: yup.string().nullable().required(translation.uk),
    en: yup.string().nullable(),
});