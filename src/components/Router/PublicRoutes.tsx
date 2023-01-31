import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { MainPublic } from '../../layouts/Main';
import { SignedInRedirect } from './SignedInRedirect';

export const PublicRoutes: FC = () => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? (
    <MainPublic>
      <Outlet />
    </MainPublic>
  ) : (
    <SignedInRedirect />
  );
};
