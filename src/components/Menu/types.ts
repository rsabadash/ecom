import { ElementType, PropsWithChildren } from 'react';

import { EventKeys } from '../../common/enums/events';
import { MENU_ALIGNMENT, MENU_POSITION } from './constants';

export type Position = ValuesOfObject<typeof MENU_POSITION>;

export type Alignment = ValuesOfObject<typeof MENU_ALIGNMENT>;

export type MenuItem = {
  id: string;
  Component: ElementType;
  action?: () => void;
  componentProps?: {
    itemClassName?: string;
    [key: string]: any;
  };
};

export type MenuProps = PropsWithChildren<{
  items: MenuItem[];
  position?: Position;
  alignment?: Alignment;
  isDisabled?: boolean;
  isObserveResize?: boolean;
  menuButtonClassName?: string;
}>;

export type KeyIndexMap = Partial<{ [key in EventKeys]: number }>;
