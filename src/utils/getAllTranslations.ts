import { Language, Translation } from '../components/IntlProvider';

type TranslationValue = Translation[];

type FieldValueTranslations = Translation | Translation[];

type Translations = undefined | {
    translations?: TranslationValue ;
};

type GetTranslationArgs<F extends readonly string[]> = {
    fields: F;
    values: {
        [key in F[number] as string]: unknown | FieldValueTranslations;
    };
    language: Language;
    translationData: {
        [key in F[number] as string]: unknown | Translations;
    };
};

type GetTranslationResult<F extends readonly any[], V> = {
    [key in F[number]]: V[key]
};

export const getAllTranslations = <F extends readonly string[], V>(
    {
        fields,
        values,
        language,
        translationData
    }: GetTranslationArgs<F>
): GetTranslationResult<F, V> => {
    const reduceAcc = {} as GetTranslationResult<F, V>;

    return fields.reduce((acc, field) => {
        const translationValues = translationData[field] as Translations;
        const fieldTranslations = translationValues?.translations;
        const fieldValue = values[field] as Translation | Translation[];

        if (fieldTranslations) {
            let translations: Translation | Translation[] | null | undefined = null;

            if (fieldValue) {
                if (Array.isArray(fieldValue)) {
                    translations = fieldValue.map((value) => {
                        const translationIndex = fieldTranslations.findIndex((t) => t[language] === value[language]);
                        return fieldTranslations[translationIndex];
                    });
                } else {
                    const translationIndex = fieldTranslations.findIndex((t) => t[language] === fieldValue[language]);
                    translations = fieldTranslations[translationIndex];
                }
            }

            return {
                ...acc,
                [field]: translations
            }
        }

        return {
            ...acc,
            [field]: fieldValue
        };
    }, reduceAcc);
};