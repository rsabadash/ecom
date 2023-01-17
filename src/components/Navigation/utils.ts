import { MenuItems } from './types';
import { routes } from '../../common/constants/routes';
import { TranslateFn } from '../IntlProvider';

export const getMenuItems = (translateFn: TranslateFn): MenuItems => {
  return [
    {
      title: translateFn('menu.dashboard'),
      path: routes.dashboard,
    },
    {
      title: translateFn('menu.categories'),
      path: routes.categories.root,
    },
    {
      title: translateFn('menu.products'),
      path: routes.products.root,
      // items: [
      //     {
      //         title: 'Статистика'
      //     },
      //     {
      //         title: 'Склад'
      //     }
      // ]
    },
    {
      title: translateFn('menu.suppliers'),
      path: routes.suppliers.root,
    },
  ];
};
