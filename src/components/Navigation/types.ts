import { EventKeys } from '../../common/enums/events';
import { ElementSize } from '../../common/types/size';
import { NavigationItemTypeEnums } from '../../layouts/Main/enums';
import { Role } from '../UserProvider/enums';

export type NavigationProps = {
  size?: ElementSize;
  navigationItems: NavigationItem[];
};

export type NavigationListProps = {
  nestedLevel: number;
  navigationItems: NavigationItem[];
};

export type NavigationLinkItemProps = {
  item: NavigationLinkItem;
  index: number;
  nestedLevel: number;
  setActiveIndex: (index: number) => void;
};

export type NavigationActionItemProps = {
  item: NavigationActionItem;
  index: number;
  nestedLevel: number;
  setActiveIndex: (index: number) => void;
};

export type NavigationLinkItem = {
  type: NavigationItemTypeEnums.Link;
  titleKey: string;
  path: string;
  roles?: Role[];
  items?: NavigationItem[];
};

export type NavigationActionItem = {
  type: NavigationItemTypeEnums.Action;
  titleKey: string;
  roles?: Role[];
  items?: NavigationItem[];
};

export type NavigationItem = NavigationLinkItem | NavigationActionItem;

export type NavData = {
  isActive: boolean;
};

export type KeyIndexMap = Partial<{ [key in EventKeys]: number }>;
