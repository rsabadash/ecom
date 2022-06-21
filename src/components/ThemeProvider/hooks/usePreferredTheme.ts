import { useMemo } from 'react';
import { THEME_STORAGE_KEY } from '../constants';
import { Theme, ThemeStorage } from '../types';
import { getSystemColorSchema } from '../utils';

export const usePreferredTheme = (themeStorage: ThemeStorage): Theme => {
    return useMemo(() => {
        return themeStorage.getTheme<Theme>(THEME_STORAGE_KEY) || getSystemColorSchema();
    }, [themeStorage]);
};