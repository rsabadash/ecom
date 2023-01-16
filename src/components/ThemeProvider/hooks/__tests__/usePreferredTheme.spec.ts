import { renderHook } from '@testing-library/react';
import { usePreferredTheme } from '../usePreferredTheme';
import { DEFAULT_THEME, THEMES } from '../../constants';
import { themeStorageMock } from '../../../../test/mocks/themeStorage.mock';

describe('usePreferredTheme', () => {
  test('obtain theme from system configuration', () => {
    themeStorageMock.getTheme.mockReturnValueOnce(null);
    const { result } = renderHook(() => usePreferredTheme(themeStorageMock));

    expect(result.current).toEqual(DEFAULT_THEME);
  });

  test('obtain theme from theme storage', () => {
    themeStorageMock.getTheme.mockReturnValueOnce(THEMES.DARK);
    const { result } = renderHook(() => usePreferredTheme(themeStorageMock));

    expect(result.current).toEqual(THEMES.DARK);
  });
});
