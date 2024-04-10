import { routes } from '../../common/constants/routes';
import { DEFAULT_ELEMENT_SIZE } from '../../common/constants/sizes';
import { NavigationItemTypeEnums } from '../../layouts/Main/enums';
import { NavigationItem } from './types';

export const DEFAULT_NAVIGATION_SIZE = DEFAULT_ELEMENT_SIZE;

export const navigationItems: NavigationItem[] = [
  {
    type: NavigationItemTypeEnums.Link,
    titleKey: 'menu.dashboard',
    path: routes.dashboard,
  },
  {
    type: NavigationItemTypeEnums.Action,
    titleKey: 'menu.categories',
    // roles: [Role.ContentManager],
    items: [
      {
        type: NavigationItemTypeEnums.Link,
        titleKey: 'menu.categories.list',
        path: routes.categories.root,
        excludeAsActive: [routes.categories.hierarchy],
        fallbackFor: [routes.categories.detail],
        strictEnd: true,
      },
      {
        type: NavigationItemTypeEnums.Link,
        titleKey: 'menu.categories.hierarchy',
        path: routes.categories.hierarchy,
        strictEnd: true,
      },
    ],
  },
  {
    type: NavigationItemTypeEnums.Action,
    titleKey: 'menu.attributes',
    items: [
      {
        type: NavigationItemTypeEnums.Link,
        titleKey: 'menu.attributes.list',
        path: routes.attributes.root,
        excludeAsActive: [routes.attributes.variantsList],
        fallbackFor: [routes.attributes.detail],
        strictEnd: true,
      },
      {
        type: NavigationItemTypeEnums.Link,
        titleKey: 'menu.variants.list',
        path: routes.attributes.variantsList,
        fallbackFor: [
          routes.attributes.variantsList,
          routes.attributes.variantDetail,
        ],
        strictEnd: true,
      },
    ],
  },
  {
    type: NavigationItemTypeEnums.Action,
    titleKey: 'menu.supplies',
    items: [
      {
        type: NavigationItemTypeEnums.Link,
        titleKey: 'menu.supplies.list',
        path: routes.supplies.root,
      },
      {
        type: NavigationItemTypeEnums.Link,
        titleKey: 'menu.suppliers.list',
        path: routes.suppliers.root,
      },
    ],
  },
  {
    type: NavigationItemTypeEnums.Link,
    titleKey: 'menu.warehouseProducts',
    path: routes.warehouseProducts.root,
  },
  {
    type: NavigationItemTypeEnums.Link,
    titleKey: 'menu.warehouses',
    path: routes.warehouses.root,
  },
];
