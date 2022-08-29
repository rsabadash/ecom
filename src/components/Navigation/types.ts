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