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
    mainPath: routes.categories.root,
    // roles: [Role.ContentManager],
    items: [
      {
        type: NavigationItemTypeEnums.Link,
        titleKey: 'menu.categories.list',
        path: routes.categories.root,
        excludeAsActive: [routes.categories.hierarchy, '/categories/test'],
      },
      {
        type: NavigationItemTypeEnums.Link,
        titleKey: 'menu.categories.hierarchy',
        path: routes.categories.hierarchy,
      },
    ],
  },
  {
    type: NavigationItemTypeEnums.Link,
    titleKey: 'menu.attributes',
    path: routes.attributes.root,
  },
  {
    type: NavigationItemTypeEnums.Link,
    titleKey: 'menu.suppliers',
    path: routes.suppliers.root,
  },
  {
    type: NavigationItemTypeEnums.Link,
    titleKey: 'menu.supplies',
    path: routes.supplies.root,
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
