import { FocusEventHandler } from 'react';

export type CheckboxValue = boolean;

export type CheckboxProps = {
  id?: string;
  name: string;
  isChecked: CheckboxValue;
  isValid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  onBlur?: FocusEventHandler;
  onChange: (isChecked: CheckboxValue) => void;
};
