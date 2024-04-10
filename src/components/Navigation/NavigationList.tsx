import { CSSProperties, FC, useMemo } from 'react';
import { clsx } from 'clsx';

import { NavigationItemTypeEnums } from '../../layouts/Main/enums';
import { useUser } from '../UserProvider';
import { NavigationActionItem } from './NavigationActionItem';
import { NavigationLinkItem } from './NavigationLinkItem';
import { NavigationItem, NavigationListProps } from './types';

import classes from './styles/index.module.css';

export const NavigationList: FC<NavigationListProps> = ({
  nestedLevel,
  navigationItems,
}) => {
  const { user, hasAllAccesses } = useUser();

  const allowedNavigationItems = useMemo<NavigationItem[]>(() => {
    if (!hasAllAccesses) {
      return navigationItems.filter((item) => {
        return user?.roles.some((userRole) => {
          if (item.roles) {
            return item.roles?.includes(userRole);
          }

          return true;
        });
      });
    }

    return navigationItems;
  }, [hasAllAccesses, navigationItems, user?.roles]);

  const styleVariables = {
    '--nested-level': nestedLevel,
  } as CSSProperties;

  const navigationListClassNames = clsx(classes.navigation__list, {
    [classes.navigation__list_nested]: nestedLevel > 0,
  });

  return (
    <ul
      role="menubar"
      aria-orientation="vertical"
      style={styleVariables}
      className={navigationListClassNames}
    >
      {allowedNavigationItems.map((navigationItem) => {
        const { titleKey, type } = navigationItem;

        return (
          <li key={titleKey}>
            {type === NavigationItemTypeEnums.Link ? (
              <NavigationLinkItem
                item={navigationItem}
                nestedLevel={nestedLevel}
              />
            ) : (
              <NavigationActionItem
                item={navigationItem}
                nestedLevel={nestedLevel}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
