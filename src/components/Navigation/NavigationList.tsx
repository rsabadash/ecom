import { CSSProperties, FC } from 'react';
import { clsx } from 'clsx';

import { NavigationItemTypeEnums } from '../../layouts/Main/enums';
import { useNavigation } from './hooks';
import { NavigationActionItem } from './NavigationActionItem';
import { NavigationLinkItem } from './NavigationLinkItem';
import { NavigationListProps } from './types';

import classes from './styles/index.module.css';

export const NavigationList: FC<NavigationListProps> = ({
  nestedLevel,
  navigationItems,
}) => {
  const {
    itemsListRef,
    setActiveIndex,
    allowedNavigationItems,
    handleNavigationKeyDown,
    handleNavigationMouseMove,
  } = useNavigation({ items: navigationItems });

  const styleVariables = {
    '--nested-level': nestedLevel,
  } as CSSProperties;

  const navigationListClassNames = clsx(classes.navigation__list, {
    [classes.navigation__list_nested]: nestedLevel > 0,
  });

  return (
    <ul
      role="menubar"
      ref={itemsListRef}
      aria-orientation="vertical"
      style={styleVariables}
      className={navigationListClassNames}
      onKeyDown={handleNavigationKeyDown}
      onMouseMove={handleNavigationMouseMove}
    >
      {allowedNavigationItems.map((navigationItem, index) => {
        const { titleKey, type } = navigationItem;

        return (
          <li key={titleKey}>
            {type === NavigationItemTypeEnums.Link ? (
              <NavigationLinkItem
                item={navigationItem}
                index={index}
                nestedLevel={nestedLevel}
                setActiveIndex={setActiveIndex}
              />
            ) : (
              <NavigationActionItem
                item={navigationItem}
                index={index}
                nestedLevel={nestedLevel}
                setActiveIndex={setActiveIndex}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
