import { Theme } from '../types';
import { DARK_SCHEMA_QUERY, DEFAULT_THEME, THEMES } from '../constants';

export const getSystemColorSchema = (
  query: string = DARK_SCHEMA_QUERY,
): Theme => {
  const isSystemSchemaDark =
    window.matchMedia && window.matchMedia(query).matches;

  return isSystemSchemaDark ? THEMES.DARK : DEFAULT_THEME;
};
