import { useCallback, useState } from 'react';
import { DEFAULT_LANGUAGE, Language } from '../../IntlProvider';
import { DropdownValue} from '../Dropdown';
import { UseMultiLanguageReturn } from './types';

export const useMultiLanguage = (): UseMultiLanguageReturn => {
    const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

    const changeLanguage = useCallback((value: DropdownValue): void => {
        if (value && typeof value === 'string') {
            const typedValue = value as Language;

            setLanguage(typedValue);
        }
    }, []);

    return {
        language,
        changeLanguage
    };
};