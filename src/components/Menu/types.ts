import { ElementType } from 'react';
import { EventKeys } from '../../common/enums/events';
import { MENU_ALIGNMENT, MENU_POSITION } from './constants';

export type Position = ValuesOfObject<typeof MENU_POSITION>;

export type Alignment = ValuesOfObject<typeof MENU_ALIGNMENT>;

export type MenuItem = {
  id: string;
  Component: ElementType;
  action: () => void;
};

export type MenuProps = {
  items: MenuItem[];
  position?: Position;
  alignment?: Alignment;
  isDisabled?: boolean;
  isObserveResize?: boolean;
};

export type KeyIndexMap = Partial<{ [key in EventKeys]: number }>;
