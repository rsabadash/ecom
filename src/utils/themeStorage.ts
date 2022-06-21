import { ThemeStorage } from '../components/ThemeProvider/types';
import { LocalStorageService } from '../services';

export const themeStorage: ThemeStorage = {
    getTheme: <V>(key: string) => LocalStorageService.getItem<V>(key),
    setTheme: <V extends string>(key: string, value: V) => LocalStorageService.setItem<V>(key, value),
};