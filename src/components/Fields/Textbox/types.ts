import { ChangeEventHandler, FocusEventHandler } from 'react';

export type TextboxValue = string;

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
  onChange?: ChangeEventHandler;
};
