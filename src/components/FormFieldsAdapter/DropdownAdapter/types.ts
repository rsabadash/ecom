import { Control, FieldValues, Path } from 'react-hook-form';
import {
  DropdownFormFieldProps,
  DropdownWithTooltipFormFieldProps,
} from '../../FormFields';
import { FormatError } from '../hooks';

type AdapterProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  control: Control<FormValues>;
};

export type DropdownAdapterProps<FormValues extends FieldValues> = Omit<
  DropdownFormFieldProps,
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

export type DropdownWithTooltipAdapterProps<FormValues extends FieldValues> =
  Omit<
    DropdownWithTooltipFormFieldProps,
    'onChange' | 'onBlur' | 'value' | 'name' | 'isValid' | 'errorMessage'
  > &
    AdapterProps<FormValues> & {
      formatError?: FormatError;
    };
