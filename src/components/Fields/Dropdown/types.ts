import { EventKeys } from '../../../common/enums/events';
import { SIZE } from './constants';

export type DropdownItemId = string;

export type DropdownItemValue<V = any> = V extends undefined
  ? string | number
  : V;

export type DropdownItemObject<
  V = DropdownItemValue,
  I = DropdownItemId,
  M = any,
> = {
  id: I;
  value: V;
  meta?: M | null;
};

export type DropdownItemPrimitive<V = DropdownItemValue> = DropdownItemValue<V>;

export type DropdownItem<V = DropdownItemValue, I = DropdownItemId, M = any> =
  | DropdownItemObject<V, I, M>
  | DropdownItemPrimitive<V>;

export type DropdownValue<V = DropdownItemValue, I = DropdownItemId, M = any> =
  | null
  | DropdownItem<V, I, M>
  | DropdownItem<V, I, M>[];

export type DropdownProps = {
  name: string;
  value?: DropdownValue;
  size?: ValuesOfObject<typeof SIZE>;
  items?: DropdownItem[];
  customItems?: any[];
  placeholder?: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isOpen?: boolean;
  isValid?: boolean;
  hasMultiselect?: boolean;
  onBlur?: () => void;
  onChange?: (value: DropdownValue, isSelected: boolean) => void;
  itemValueGetter?: (item: any) => string | string[] | null;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
};

export type KeyIndexMap = Partial<{ [key in EventKeys]: number }>;
