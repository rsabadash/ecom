import { lazy, Suspense } from 'react';
import { routes } from '../../../common/constants/routes';

const Dashboard = lazy(() => import('../../../modules/dashboard/Dashboard'));

export const dashboardRoutes = [
  {
    path: routes.dashboard,
    element: (
      <Suspense fallback="Route Dashboard">
        <Dashboard />
      </Suspense>
    ),
  },
];
