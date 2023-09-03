import { Outlet } from 'react-router-dom';

import { themeStorage } from '../../common/utils';
import { AuthProvider } from '../../components/AuthProvider';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { IntlProvider } from '../../components/IntlProvider';
import { ThemeProvider } from '../../components/ThemeProvider';

export const Root = () => {
  return (
    <ErrorBoundary fallback="Error boundary Root">
      <ThemeProvider themeStorage={themeStorage}>
        <IntlProvider>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </IntlProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
