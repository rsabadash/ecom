import { FC } from 'react';

import { DEFAULT_NAVIGATION_SIZE } from './constants';
import { NavigationList } from './NavigationList';
import { NavigationProps } from './types';

import classes from './styles/index.module.css';

export const Navigation: FC<NavigationProps> = ({
  size = DEFAULT_NAVIGATION_SIZE,
  navigationItems,
}) => {
  return (
    <nav aria-label="Main" className={classes[`navigation_${size}`]}>
      <NavigationList nestedLevel={0} navigationItems={navigationItems} />
    </nav>
  );
};
