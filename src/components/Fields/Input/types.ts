import { ElementType } from 'react';
import { INPUT_TYPE, SIZE } from './constants';

export type InputValue = string;

export type InputFormValue = string | number | null | undefined;

export type InputType = ValuesOfObject<typeof INPUT_TYPE>;

export type InputProps = {
  id?: string;
  name: string;
  type?: InputType;
  size?: ValuesOfObject<typeof SIZE>;
  value?: null | InputValue;
  placeholder?: string;
  isValid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  onBlur?: (value: InputFormValue) => void;
  onFocus?: (value: InputFormValue) => void;
  onChange?: (value: InputFormValue) => void;
  onIconClick?: () => void;
  valueGetter?: (value: any) => InputValue;
  formatValue?: (value: any, prevValue: any) => InputFormValue;
  Icon?: ElementType;
  iconId?: string;
  iconAriaLabel?: string;
  inputClassName?: string;
};
