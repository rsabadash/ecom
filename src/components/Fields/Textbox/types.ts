import { FocusEventHandler } from 'react';

export type TextboxValue = string;

export type TextboxFormValue = string | number | null | undefined;

export type TextboxProps = {
  id?: string;
  name: string;
  value?: null | TextboxValue;
  placeholder?: string;
  isValid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  onBlur?: FocusEventHandler;
  onChange?: (value: TextboxFormValue) => void;
  valueGetter?: (value: any) => TextboxValue;
  formatValue?: (value: any) => TextboxFormValue;
};
