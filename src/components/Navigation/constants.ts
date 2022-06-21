import { routes } from '../../common/constants/routes';
import { MenuItems } from './types';

export const menuItems: MenuItems = [
    {
        title: 'Головна',
        path: routes.dashboard
    },
    {
        title: 'Товари',
        path: routes.products
        // items: [
        //     {
        //         title: 'Статистика'
        //     },
        //     {
        //         title: 'Склад'
        //     }
        // ]
    }
];
