import {
    GetPlaceholderArgs,
    GetPlaceholderReturn,
    GetErrorMessageArgs,
    GetErrorMessageReturn
} from './types';

export const getErrorMessage = ({ error, translate }: GetErrorMessageArgs): GetErrorMessageReturn => {
    let message: GetErrorMessageReturn = undefined;
    const [name, language] = error.ref?.name.split('.') || [];

    if (name && language) {
        message = translate(
            `attributes.${name}.error.${error.type}`,
            {
                language: translate(`${language}.adjective`)
            }
        );
    }

    return message;
};

export const getPlaceholder = ({ placeholder, language, translate }: GetPlaceholderArgs): GetPlaceholderReturn => {
    if (placeholder) {
        const translatedLanguage = translate(`${language}.adjective`);
        return placeholder.replace(/{language}/, translatedLanguage);
    }
};