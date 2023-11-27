import { FC, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { Collapse } from '../Collapse';
import { useTranslation } from '../IntlProvider';
import { NavigationList } from './NavigationList';
import { NavigationActionItemProps } from './types';

import classes from './styles/index.module.css';

export const NavigationActionItem: FC<NavigationActionItemProps> = ({
  item,
  nestedLevel,
}) => {
  const { pathname } = useLocation();
  const { translate } = useTranslation();

  const [isNestedItemActive, setIsNestedItemActive] = useState<boolean>(false);

  const { titleKey, items, mainPath } = item;

  const forceExpandRef = useRef<boolean>(false);

  const hasSubItems = items && items.length > 0;

  useEffect(() => {
    if (hasSubItems) {
      const isCurrentPathActive = pathname.includes(mainPath);

      if (isCurrentPathActive) {
        forceExpandRef.current = true;
      }

      setIsNestedItemActive(isCurrentPathActive);
    }
  }, [hasSubItems, mainPath, pathname]);

  const headerClassName = clsx(classes.navigation__itemLink, {
    [classes.navigation__itemLink_active]: isNestedItemActive,
  });

  return (
    <Collapse
      isToggleableHeader
      forceExpand={forceExpandRef.current}
      header={translate(titleKey)}
      body={
        hasSubItems && (
          <NavigationList
            nestedLevel={nestedLevel + 1}
            navigationItems={items}
          />
        )
      }
      tabIndex={0}
      headerClassName={headerClassName}
    />
  );
};
