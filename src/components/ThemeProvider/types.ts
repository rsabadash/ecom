import { PropsWithChildren } from 'react';

import { THEMES } from './constants';

export type Theme = ValuesOfObject<typeof THEMES>;

export type GetThemeFunction = <V>(key: string) => V | null;
export type SetThemeFunction = <V extends string>(
  key: string,
  value: V,
) => void;

export type ThemeStorage = {
  getTheme: GetThemeFunction;
  setTheme: SetThemeFunction;
};

export type ThemeProviderProps = PropsWithChildren<{
  themeStorage: ThemeStorage;
  useUserAgentTheming?: boolean;
}>;

export type ThemeContextValue = {
  theme: Theme;
  switchTheme: () => void;
};
