import * as yup from 'yup'

type MainTranslation = {
    uk: string;
};

type AllTranslations = MainTranslation & {
    en: string;
};

export const allTranslationsRequired = (translations: AllTranslations) => ({
    uk: yup.string().required(translations.uk),
    en: yup.string().required(translations.en)
});

export const mainTranslationRequired = (translation: MainTranslation) => ({
    uk: yup.string().required(translation.uk),
    en: yup.string()
});