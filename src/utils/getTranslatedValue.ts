import { Language, Translation } from '../components/IntlProvider';

type TranslationValue = Translation | Translation[] | null;

type GetValueArgs<F extends readonly string[]> = {
    fields: F;
    language: Language;
    translationData: {
        [key in F[number] as string]: TranslationValue | unknown;
    };
};

type GetValuesResult<F extends readonly any[], V> = {
    [key in F[number]]: V[key]
};

export const getTranslatedValue =  <F extends readonly string[], V>(
    {
        fields,
        language,
        translationData
    }: GetValueArgs<F>
): GetValuesResult<F, V> => {
    const reduceAcc = {} as GetValuesResult<F, V>;

    return fields.reduce((acc, field) => {
        const valueTranslations = translationData[field] as TranslationValue;
        let value: string | string[] | null = null;

        if (valueTranslations) {
            if (Array.isArray(valueTranslations)) {
                value = valueTranslations.map((translation) => translation[language]);
            } else {
                value = valueTranslations[language];
            }
        }

        return {
            ...acc,
            [field]: value
        };
    }, reduceAcc);
};