import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { themeStorageMock } from '../../../test/mocks/themeStorage.mock';

describe('ThemeProvider', () => {
  test('render ThemeProvider with children', () => {
    const labelText = 'Test label';

    render(
      <ThemeProvider themeStorage={themeStorageMock}>
        <form>
          <label htmlFor={labelText}>{labelText}</label>
          <input id={labelText} type="text" />
        </form>
      </ThemeProvider>,
    );

    const children = screen.getByLabelText(labelText);

    expect(children).toBeInTheDocument();
  });
});
