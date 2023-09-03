import { Control, FieldValues, Path } from 'react-hook-form';

import {
  TextboxFormFieldProps,
  TextboxWithCollapseFormFieldProps,
} from '../../FormFields';
import { FormatError } from '../hooks';

type AdapterProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  control: Control<FormValues>;
};

export type TextboxAdapterProps<FormValues extends FieldValues> = Omit<
  TextboxFormFieldProps,
  | 'onChange'
  | 'onBlur'
  | 'value'
  | 'name'
  | 'isValid'
  | 'errorMessage'
  | 'ariaLabel'
> &
  AdapterProps<FormValues> & {
    formatError?: FormatError;
  };

export type TextboxWithCollapseAdapterProps<FormValues extends FieldValues> =
  Omit<
    TextboxWithCollapseFormFieldProps,
    | 'onChange'
    | 'onBlur'
    | 'value'
    | 'name'
    | 'isValid'
    | 'errorMessage'
    | 'ariaLabel'
  > &
    AdapterProps<FormValues> & {
      formatError?: FormatError;
    };
