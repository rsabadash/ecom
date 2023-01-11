import { AddLanguageToTranslationArgs, AddLanguageToTranslationReturn } from './types';

export const addLanguageToTranslation = ({ translation, language, translate }: AddLanguageToTranslationArgs): AddLanguageToTranslationReturn => {
    if (translation) {
        return translate(translation, {
            language: translate(`${language}.adjective`)
        });
    }
};