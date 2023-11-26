import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { useTranslation } from '../IntlProvider';
import { NavigationList } from './NavigationList';
import { NavData, NavigationLinkItemProps } from './types';

import classes from './styles/index.module.css';

export const NavigationLinkItem: FC<NavigationLinkItemProps> = ({
  item,
  index,
  nestedLevel,
  setActiveIndex,
}) => {
  const { pathname } = useLocation();

  const { translate } = useTranslation();

  const { path, titleKey, items } = item;

  const hasSubItems = items && items.length > 0;

  return (
    <>
      <NavLink
        to={path}
        role="menuitem"
        className={({ isActive }: NavData): string | undefined => {
          if (isActive) {
            setActiveIndex(index);
          }

          return clsx(classes.navigation__itemLink, {
            [classes.navigation__itemLink_active]: isActive,
          });
        }}
        tabIndex={path === pathname ? 0 : -1}
      >
        {translate(titleKey)}
      </NavLink>
      {hasSubItems && (
        <NavigationList nestedLevel={nestedLevel + 1} navigationItems={items} />
      )}
    </>
  );
};
