import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../../components/AuthProvider';
import { IntlProvider } from '../../components/IntlProvider';
import { ThemeProvider } from '../../components/ThemeProvider';
import { themeStorage } from '../../common/utils';
import { ErrorBoundary } from '../../components/ErrorBoundary';

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
