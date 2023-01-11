import { useCallback } from 'react';
import { Language, Translations, useTranslation } from '../components/IntlProvider';

type TranslateDropdownValueItem = null | string | string[] | Translations | Translations[];

type TranslateDropdownValueReturn = null | string | string[];

type ReturnHookType = {
    translateDropdownValue: (item: TranslateDropdownValueItem) => TranslateDropdownValueReturn;
};

export const useTranslatedDropdownValue = (): ReturnHookType => {
    const { language: userLanguage } = useTranslation();

    const checkTranslation = useCallback((translations: Translations, language: Language): string => {
        return translations[language] || '';
    }, []);
    
    const translateDropdownValue = useCallback((item: TranslateDropdownValueItem): TranslateDropdownValueReturn => {
        if (!item) {
            return null;
        }

        if (item && Array.isArray(item)) {
            return item.map((i) => typeof i === 'string' ? i : checkTranslation(i, userLanguage));
        }

        return typeof item === 'string' ? item : checkTranslation(item, userLanguage);
    }, [userLanguage, checkTranslation]);

    return {
        translateDropdownValue
    };
};