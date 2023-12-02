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
  // "/categories" -> active
  // "/categories/id" => active
  // excludeAsActive: ["/categories/test"] => not active
  excludeAsActive?: string[];
  // it helps to define additional paths that should be marked as active for the current path
  // in some cases we have to use both excludeAsActive and fallbackFor
  // example:
  //     items: [
  //       {
  //         path: routes.attributes.root,
  //         excludeAsActive: ["/attributes/variants"], <- defined as excluded because it intersects with pattern bellow "/attributes/:id"
  //         that is why we should explicitly define that exact that path has to be excluded
  //         fallbackFor: ["/attributes/:id"],
  //       },
  //       {
  //         path: routes.attributes.variantsList,
  //         fallbackFor: [
  //           "/attributes/variants",
  //           "/attributes/:attributeId/variants/:variantId",
  //         ],
  //       },
  //     ],
  fallbackFor?: string[];
  // should be true if this pattern should match the entire path
  strictEnd?: boolean;
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
