import { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Language, TranslationProviderProps, TranslationContextValue } from './types';
import { translationContextValuesDefault } from './constants';
import {createProvider} from "../../utils";

const [Provider, useTranslation] = createProvider<TranslationContextValue>({
        contextName: 'TranslationContext',
        contextDefaultValue: translationContextValuesDefault
    })

const TranslationProvider: FC<PropsWithChildren<TranslationProviderProps>> = (
    {
        language,
        setLanguage,
        children
    }
) => {
    const { formatMessage } = useIntl();

    const changeLanguage = useCallback((language: Language): void => {
        setLanguage(language);
    }, [setLanguage]);

    const translate = useCallback((value: string, placeholders?: Record<string, string>): string => {
        return formatMessage({ id: value }, placeholders)
    }, [formatMessage]);

    const contextValue = useMemo<TranslationContextValue>(() => ({
        language,
        translate,
        changeLanguage
    }), [language, translate, changeLanguage]);

    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    );
};

export { TranslationProvider, useTranslation }