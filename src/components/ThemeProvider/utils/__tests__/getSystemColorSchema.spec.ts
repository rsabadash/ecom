import { getSystemColorSchema } from '../getSystemColorSchema';
import { DARK_SCHEMA_QUERY, LIGHT_SCHEMA_QUERY, THEMES } from '../../constants';
import { matchMediaMock } from '../../../../test/mocks/matchMedia.mock';

const defineMediaMockQuery = matchMediaMock();

describe('getSystemColorSchema', () => {
  test('dark theme predefined', () => {
    defineMediaMockQuery({ query: DARK_SCHEMA_QUERY });
    const systemColorSchema = getSystemColorSchema();

    expect(systemColorSchema).toBe(THEMES.DARK);
  });

  test('light theme predefined', () => {
    defineMediaMockQuery({ query: LIGHT_SCHEMA_QUERY });
    const systemColorSchema = getSystemColorSchema();

    expect(systemColorSchema).toBe(THEMES.LIGHT);
  });
});
