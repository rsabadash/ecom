import { GetPlaceholderArgs, GetPlaceholderReturn } from './types';

export const getPlaceholder = ({ placeholder, language, translate }: GetPlaceholderArgs): GetPlaceholderReturn => {
    if (placeholder) {
        const translatedLanguage = translate(`${language}.adjective`);
        return placeholder.replace(/{language}/, translatedLanguage);
    }
};