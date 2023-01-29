import { FocusEventHandler } from 'react';

export type InputValue = string;

export type InputFormValue = string | number | null | undefined;

export type InputType = 'text' | 'number' | 'password' | 'email';

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
  valueGetter?: (value: any) => InputValue;
  formatValue?: (value: any) => InputFormValue;
  inputClassName?: string;
};
