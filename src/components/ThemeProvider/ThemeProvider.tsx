import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import './styles/common.css';
import './styles/darkTheme.css';
import './styles/lightTheme.css';
import './styles/index.css';

import { createProvider } from '../../common/utils';
import {
  CONTEXT_NAME,
  ROOT_ID,
  THEME_STORAGE_KEY,
  themeContextValuesDefault,
  THEMES,
} from './constants';
import { usePreferredTheme } from './hooks';
import { Theme, ThemeContextValue, ThemeProviderProps } from './types';

const [Provider, useTheme] = createProvider<ThemeContextValue>({
  contextName: CONTEXT_NAME,
  contextDefaultValue: themeContextValuesDefault,
});

const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  themeStorage,
  useUserAgentTheming,
}) => {
  const defaultTheme = usePreferredTheme(themeStorage);
  const [theme, setTheme] = useState<Theme>(() => defaultTheme);

  useLayoutEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
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
    <Provider value={providerValue}>
      <div
        id={ROOT_ID}
        style={useUserAgentTheming ? { colorScheme: theme } : undefined}
      >
        {children}
      </div>
    </Provider>
  );
};

export { ThemeProvider, useTheme };
