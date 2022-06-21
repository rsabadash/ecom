import { Language } from '../components/IntlProvider';
import { Translation } from '../modules/products/categories/types';

type GetTranslationOptions<F extends string> = {
    fields: F[];
    values: { [key in F]: unknown };
    language: Language;
    translationData: { [key in F]: { translations?: Translation[] } };
};

type GetTranslationResult<F extends string> = {
    [key in F]: Translation;
};

export const getAllTranslationForFields = <F extends string>(
    {
        fields,
        values,
        language,
        translationData
    }: GetTranslationOptions<F>
): GetTranslationResult<F> => {
    const reduceAcc = {} as GetTranslationResult<F>;

    return fields.reduce((acc, field) => {
        const fieldTranslations = translationData[field].translations;

        if (fieldTranslations) {

            const translationIndex = fieldTranslations.findIndex((t) => t[language] === values[field]);
            return {
                ...acc,
                [field]: fieldTranslations[translationIndex]
            }
        }

        return acc;
    }, reduceAcc);
};