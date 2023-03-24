import { routes } from '../../../common/constants/routes';
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('../../../modules/dashboard/Dashboard'));

export const DashboardRoutes = [
  {
    path: routes.dashboard,
    element: (
      <Suspense fallback="Route Dashboard">
        <Dashboard />
      </Suspense>
    ),
  },
];
