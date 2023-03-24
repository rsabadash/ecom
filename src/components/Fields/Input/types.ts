import { FocusEventHandler, ElementType } from 'react';
import { inputType } from './constants';

export type InputValue = string;

export type InputFormValue = string | number | null | undefined;

export type InputType = ValuesOfObject<typeof inputType>;

export type InputProps = {
  id?: string;
  name: string;
  type?: InputType;
  value?: null | InputValue;
  placeholder?: string;
  isValid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  onBlur?: FocusEventHandler;
  onChange?: (value: InputFormValue) => void;
  onIconClick?: () => void;
  valueGetter?: (value: any) => InputValue;
  formatValue?: (value: any) => InputFormValue;
  Icon?: ElementType;
  iconAriaLabel?: string;
  inputClassName?: string;
};
