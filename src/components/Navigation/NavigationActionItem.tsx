import { FC, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { NavigationItemTypeEnums } from '../../layouts/Main/enums';
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
  const nestedItemsPathRef = useRef<(string | null)[] | undefined>(
    items?.map((item) => {
      return item.type === NavigationItemTypeEnums.Link ? item.path : null;
    }),
  );

  const hasSubItems = items && items.length > 0;

  useEffect(() => {
    if (hasSubItems) {
      // we use mainPath to determinate if any of subpages is active
      // example "/categories", but navigation item for "/categories/id" (detail page) is absent, so we mark main link as active
      // for common case we just check if one of nested item path is equal to current pathname
      const isCurrentPathActive =
        (mainPath && pathname.includes(mainPath)) ||
        !!nestedItemsPathRef.current?.includes(pathname);

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
