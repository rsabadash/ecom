import { FC } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { useTranslation } from '../IntlProvider';
import { NavigationList } from './NavigationList';
import { NavData, NavigationLinkItemProps } from './types';

import classes from './styles/index.module.css';

const chickIsCurrentPathFallback = ({
  fallbackFor,
  pathname,
}: {
  fallbackFor: string[];
  pathname: string;
}) => {
  return fallbackFor?.some(
    (fallbackForPath) =>
      fallbackForPath === pathname ||
      matchPath({ path: fallbackForPath, end: true }, pathname),
  );
};

export const NavigationLinkItem: FC<NavigationLinkItemProps> = ({
  item,
  nestedLevel,
}) => {
  const { pathname } = useLocation();

  const { translate } = useTranslation();

  const { path, titleKey, items, excludeAsActive, fallbackFor, strictEnd } =
    item;

  const hasSubItems = items && items.length > 0;

  const isPathExcluded = excludeAsActive?.includes(pathname);

  return (
    <>
      <NavLink
        to={path}
        role="menuitem"
        className={({ isActive }: NavData): string | undefined => {
          return clsx(classes.navigation__itemLink, {
            [classes.navigation__itemLink_active]:
              isActive ||
              (!isPathExcluded &&
                fallbackFor &&
                chickIsCurrentPathFallback({ fallbackFor, pathname })),
          });
        }}
        tabIndex={0}
        end={strictEnd}
      >
        {translate(titleKey)}
      </NavLink>
      {hasSubItems && (
        <NavigationList nestedLevel={nestedLevel + 1} navigationItems={items} />
      )}
    </>
  );
};
