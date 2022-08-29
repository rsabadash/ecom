import { MenuItems } from './types';
import { routes } from '../../common/constants/routes';
import { TranslateFn } from '../IntlProvider';

export const getMenuItems = (translateFn: TranslateFn): MenuItems => {
    return [
        {
            title: translateFn('menu.dashboard'),
            path: routes.dashboard
        },
        {
            title: translateFn('menu.products'),
            path: routes.products,
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
}