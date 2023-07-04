import { Navigate } from 'react-router-dom';

import { routes } from '../../common/constants/routes';

export const SignedInRedirect = () => {
  return <Navigate replace to={routes.dashboard} />;
};
