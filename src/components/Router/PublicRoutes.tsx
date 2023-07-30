import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { MainPublic } from '../../layouts/Main';
import { useAuth } from '../AuthProvider';
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
