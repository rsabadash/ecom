import { routes } from '../../common/constants/routes';
import { TranslateFn } from '../IntlProvider';
import { NavigationItems } from './types';
// import { Role } from '../UserProvider/enums';

export const getMenuItems = (translateFn: TranslateFn): NavigationItems => {
  return [
    {
      title: translateFn('menu.dashboard'),
      path: routes.dashboard,
    },
    {
      title: translateFn('menu.categories'),
      path: routes.categories.root,
      // roles: [Role.ContentManager],
    },
    {
      title: translateFn('menu.attributes'),
      path: routes.attributes.root,
    },
    {
      title: translateFn('menu.suppliers'),
      path: routes.suppliers.root,
    },
    {
      title: translateFn('menu.supplies'),
      path: routes.supplies.root,
    },
    {
      title: translateFn('menu.warehouseProducts'),
      path: routes.warehouseProducts.root,
    },
    {
      title: translateFn('menu.warehouses'),
      path: routes.warehouses.root,
    },
  ];
};
