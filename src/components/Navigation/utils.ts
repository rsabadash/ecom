import clsx from 'clsx';
import { MenuItems, NavData } from './types';
import classes from './styles/index.module.css';
import { routes } from '../../common/constants/routes';
import { TranslateFn } from '../IntlProvider';

export const isNavLinkActive = (navData: NavData): string | undefined => {
    return clsx(classes.navigation__itemLink,{ [classes.navigation__itemLink_active]: navData.isActive });
};

export const getMenuItems = (translateFn: TranslateFn): MenuItems => {
    return [
        {
            title: translateFn('menu.dashboard'),
            path: routes.dashboard
        },
        {
            title: translateFn('menu.products'),
            path: routes.products
        }
    ];
}