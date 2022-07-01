import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import { ThemeContextValue } from '../types';

export const useTheme = (): ThemeContextValue => {
    const context = useContext<ThemeContextValue>(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};