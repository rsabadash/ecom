import { renderHook } from '@testing-library/react';

import { themeStorageMock } from '../../../../test/mocks/themeStorage.mock';
import { DEFAULT_THEME, THEMES } from '../../constants';
import { usePreferredTheme } from '../usePreferredTheme';

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
