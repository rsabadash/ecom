import { lazy, Suspense } from 'react';

import { routes } from '../../../common/constants/routes';

const Settings = lazy(() => import('../../../modules/settings/Settings'));

export const settingsRoutes = [
  {
    path: routes.settings.root,
    element: (
      <Suspense fallback="Route Settings">
        <Settings />
      </Suspense>
    ),
  },
];
