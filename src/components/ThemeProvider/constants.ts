import { APPLICATION_NAME } from '../../common/constants/application';

export const DARK_SCHEMA_QUERY = '(prefers-color-scheme: dark)';

export const LIGHT_SCHEMA_QUERY = '(prefers-color-scheme: light)';

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export const DEFAULT_THEME = THEMES.LIGHT;

export const THEME_STORAGE_KEY = `${APPLICATION_NAME}.theme`;

export const ROOT_ID = 'theme-root';
