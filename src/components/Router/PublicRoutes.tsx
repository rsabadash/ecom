import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { routes } from '../../common/constants/routes';
import { useAuth } from '../AuthProvider';
import { MainPublic } from '../../layouts/Main';

export const PublicRoutes: FC = () => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? (
    <MainPublic>
      <Outlet />
    </MainPublic>
  ) : (
    <Navigate to={routes.dashboard} />
  );
};
