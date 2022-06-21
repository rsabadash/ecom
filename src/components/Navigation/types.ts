export type MenuItem = {
    title: string;
    path: string,
    items?: MenuItems;
};

export type MenuItems = MenuItem[];

export type NavData = {
    isActive: boolean;
};