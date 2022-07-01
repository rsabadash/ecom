import { useContext } from 'react';
import { TranslationContext } from './TranslationProvider';
import { TranslationContextValue } from './types';

export const useTranslation = (): TranslationContextValue => {
    const context = useContext<TranslationContextValue>(TranslationContext);

    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }

    return context;
};