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
  nestedLevel: number;
};

export type NavigationActionItemProps = {
  item: NavigationActionItem;
  nestedLevel: number;
};

export type NavigationLinkItem = {
  type: NavigationItemTypeEnums.Link;
  titleKey: string;
  path: string;
  roles?: Role[];
  items?: NavigationItem[];
  // not to set nested path as active
  // example: click on Categories link
  // /categories -> active
  // /categories/id => active
  // excludeAsActive: [/categories/test] => not active
  excludeAsActive?: string[];
};

export type NavigationActionItem = {
  type: NavigationItemTypeEnums.Action;
  titleKey: string;
  roles?: Role[];
  items?: NavigationItem[];
  // based on tht path is defined either shod we show nested links or not
  mainPath: string;
};

export type NavigationItem = NavigationLinkItem | NavigationActionItem;

export type NavData = {
  isActive: boolean;
};

export type KeyIndexMap = Partial<{ [key in EventKeys]: number }>;
