import { FocusEventHandler } from 'react';

export type InputValue = string;

export type InputFormValue = string | number | null | undefined;

export type InputProps = {
  id?: string;
  name: string;
  type?: 'text' | 'number' | 'password' | 'email';
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
