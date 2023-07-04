import { KeyboardEvent, RefObject } from 'react';

import { EventKeys } from '../../common/enums/events';
import { Role } from '../UserProvider/enums';

export type NavigationItem = {
  title: string;
  path: string;
  roles?: Role[];
  items?: NavigationItems;
};

export type NavigationItems = NavigationItem[];

export type NavData = {
  isActive: boolean;
};

export type KeyIndexMap = Partial<{ [key in EventKeys]: number }>;

export type UseNavigationReturn = {
  menuItems: NavigationItems;
  itemsListRef: RefObject<HTMLUListElement>;
  handleNavigationKeyDown: (e: KeyboardEvent<HTMLUListElement>) => void;
  handleNavigationMouseMove: () => void;
  focusIndex: number;
  setInitialIndex: (index: number) => void;
};
