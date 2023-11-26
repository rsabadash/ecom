import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { NavigationItemTypeEnums } from '../../layouts/Main/enums';
import { Collapse } from '../Collapse';
import { useTranslation } from '../IntlProvider';
import { INDEX_ABSENCE_FOCUS } from './constants';
import { NavigationList } from './NavigationList';
import { NavigationActionItemProps } from './types';

import classes from './styles/index.module.css';

export const NavigationActionItem: FC<NavigationActionItemProps> = ({
  item,
  index,
  nestedLevel,
  setActiveIndex,
}) => {
  const { pathname } = useLocation();
  const { translate } = useTranslation();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isNestedItemActive, setIsNestedItemActive] = useState<boolean>(false);

  const { titleKey, items } = item;

  const forceExpandRef = useRef<boolean>(false);
  const nestedItemsPathRef = useRef<(string | null)[] | undefined>(
    items?.map((item) => {
      return item.type === NavigationItemTypeEnums.Link ? item.path : null;
    }),
  );

  const hasSubItems = items && items.length > 0;

  const handleExpand = useCallback(() => {
    setIsActive(true);
    setActiveIndex(index);
  }, [index, setActiveIndex]);

  const handleCollapse = () => {
    setIsActive(false);
    setActiveIndex(INDEX_ABSENCE_FOCUS);
  };

  useEffect(() => {
    if (hasSubItems && nestedItemsPathRef.current) {
      const isCurrentPathActive =
        nestedItemsPathRef.current?.includes(pathname);

      if (isCurrentPathActive) {
        handleExpand();
        forceExpandRef.current = true;
      }

      setIsNestedItemActive(isCurrentPathActive);
    }
  }, [handleExpand, hasSubItems, pathname]);

  const headerClassName = clsx(classes.navigation__itemLink, {
    [classes.navigation__itemLink_active]: isActive,
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
      tabIndex={isActive && isNestedItemActive ? 0 : -1}
      onExpand={handleExpand}
      onCollapse={handleCollapse}
      headerClassName={headerClassName}
    />
  );
};
