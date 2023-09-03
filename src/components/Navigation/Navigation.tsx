import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { useAuth } from '../AuthProvider';
import { Button } from '../Button';
import { useTranslation } from '../IntlProvider';
import { DEFAULT_NAVIGATION_SIZE, INDEX_ABSENCE_FOCUS } from './constants';
import { useNavigation } from './hooks';
import { NavData, NavigationProps } from './types';

import classes from './styles/index.module.css';

export const Navigation: FC<NavigationProps> = ({
  size = DEFAULT_NAVIGATION_SIZE,
}) => {
  const { translate } = useTranslation();
  const { signOut } = useAuth();

  const {
    menuItems,
    focusIndex,
    itemsListRef,
    setInitialIndex,
    handleNavigationKeyDown,
    handleNavigationMouseMove,
  } = useNavigation();

  return (
    <nav aria-label="Main" className={classes[`navigation_${size}`]}>
      <ul
        role="menubar"
        ref={itemsListRef}
        aria-orientation="vertical"
        className={classes.navigation__list}
        onKeyDown={handleNavigationKeyDown}
        onMouseMove={handleNavigationMouseMove}
      >
        {menuItems.map(({ title, path, items }, index) => {
          const hasSubItems = items && items.length > 0;
          const tabIndex =
            focusIndex === index || focusIndex === INDEX_ABSENCE_FOCUS ? 0 : -1;

          return (
            <li key={title} className={classes.navigation__item}>
              <NavLink
                to={path}
                role="menuitem"
                className={({ isActive }: NavData): string | undefined => {
                  if (isActive) {
                    setInitialIndex(index);
                  }

                  return clsx(classes.navigation__itemLink, {
                    [classes.navigation__itemLink_active]: isActive,
                  });
                }}
                tabIndex={tabIndex}
              >
                {title}
              </NavLink>
              {hasSubItems && <div>TODO Subitems</div>}
            </li>
          );
        })}
      </ul>

      <Button variant="primary" onClick={signOut}>
        {translate('signOut')}
      </Button>
    </nav>
  );
};
