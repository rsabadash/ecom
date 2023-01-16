import {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import { usePreferredTheme } from './hooks';
import { Theme, ThemeContextValue, ThemeProviderProps } from './types';
import { ROOT_ID, THEMES, THEME_STORAGE_KEY } from './constants';

import './styles/common.css';
import './styles/darkTheme.css';
import './styles/lightTheme.css';
import './styles/index.css';

export const ThemeContext = createContext<ThemeContextValue>({
  switchTheme: () => null,
});

const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  themeStorage,
  useUserAgentTheming,
}) => {
  const defaultTheme = usePreferredTheme(themeStorage);
  const [theme, setTheme] = useState<Theme>(() => defaultTheme);

  useLayoutEffect((): void => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect((): void => {
    const savedTheme = themeStorage.getTheme<Theme>(THEME_STORAGE_KEY);

    if (!savedTheme) {
      themeStorage.setTheme<Theme>(THEME_STORAGE_KEY, defaultTheme);
    }
  }, [defaultTheme, themeStorage]);

  const switchTheme = useCallback((): void => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
      themeStorage.setTheme<Theme>(THEME_STORAGE_KEY, nextTheme);

      return nextTheme;
    });
  }, [themeStorage]);

  const providerValue = useMemo<ThemeContextValue>(() => {
    return {
      switchTheme,
    };
  }, [switchTheme]);

  return (
    <ThemeContext.Provider value={providerValue}>
      <div
        id={ROOT_ID}
        style={useUserAgentTheming ? { colorScheme: theme } : undefined}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
