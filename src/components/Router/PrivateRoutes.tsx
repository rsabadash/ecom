import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { routes } from '../../common/constants/routes';
import { UserProvider } from '../UserProvider';
import { Main } from '../../layouts/Main';
import { useAuth } from '../AuthProvider';

export const PrivateRoutes: FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <UserProvider>
      <Main>
        <Outlet />
      </Main>
    </UserProvider>
  ) : (
    <Navigate to={routes.signIn} />
  );
};
