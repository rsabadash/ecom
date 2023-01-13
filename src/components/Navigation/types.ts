import { KeyboardEvent, RefObject } from 'react';
import { EventKeys } from '../../common/enums/events';

export type MenuItem = {
    title: string;
    path: string,
    items?: MenuItems;
};

export type MenuItems = MenuItem[];

export type NavData = {
    isActive: boolean;
};

export type KeyIndexMap = Partial<{ [key in EventKeys]: number }>;

export type UseNavigationReturn = {
    menuItems: MenuItems;
    itemsListRef: RefObject<HTMLUListElement>;
    handleNavigationKeyDown: (e: KeyboardEvent<HTMLUListElement>) => void;
    handleNavigationMouseMove: () => void;
    focusIndex: number;
    setInitialIndex: (index: number) => void;
};