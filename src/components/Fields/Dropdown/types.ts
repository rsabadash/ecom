import { EventKeys } from '../../../common/enums/events';
import { SIZE } from './constants';

export type DropdownItemId = string;

export type DropdownItemValue<V = string | number> = V extends undefined
  ? string | number
  : V;

export type DropdownItemObject<V = DropdownItemValue, I = DropdownItemId> = {
  id: I;
  value: V;
};

export type DropdownItemPrimitive<V = DropdownItemValue> = DropdownItemValue<V>;

export type DropdownItem<V = DropdownItemValue> =
  | DropdownItemObject<V>
  | DropdownItemPrimitive<V>;

export type DropdownValue<V = DropdownItemValue> =
  | null
  | DropdownItem<V>
  | DropdownItem<V>[];

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
  onChange: (value: DropdownValue) => void;
  itemValueGetter?: (item: any) => string | string[] | null;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
};

export type KeyIndexMap = Partial<{ [key in EventKeys]: number }>;
