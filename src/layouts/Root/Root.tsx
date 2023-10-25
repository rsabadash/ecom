import { Outlet, useLocation } from 'react-router-dom';

import { themeStorage } from '../../common/utils';
import { AuthProvider } from '../../components/AuthProvider';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { IntlProvider } from '../../components/IntlProvider';
import { Notifications } from '../../components/Notifications';
import { ThemeProvider } from '../../components/ThemeProvider';

export const Root = () => {
  const { pathname } = useLocation();

  return (
    // reset key is here to force the re-rendering of children inside ErrorBoundary when the location is changed
    <ErrorBoundary fallback="Error boundary Root" resetKey={pathname}>
      <ThemeProvider themeStorage={themeStorage}>
        <IntlProvider>
          <AuthProvider>
            <Outlet />
            <Notifications />
          </AuthProvider>
        </IntlProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
