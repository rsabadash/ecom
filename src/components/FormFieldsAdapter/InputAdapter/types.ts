import { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import {
  InputFormFieldProps,
  InputWithCollapseFormFieldProps,
} from '../../FormFields';

type AdapterProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  control: Control<FormValues>;
};

export type InputAdapterProps<FormValues extends FieldValues> = Omit<
  InputFormFieldProps,
  'onChange' | 'onBlur' | 'value' | 'name' | 'isValid' | 'errorMessage'
> &
  AdapterProps<FormValues> & {
    formatError?: (error: FieldError) => undefined | string;
  };

export type InputWithCollapseAdapterProps<FormValues extends FieldValues> =
  Omit<
    InputWithCollapseFormFieldProps,
    'onChange' | 'onBlur' | 'value' | 'name' | 'isValid' | 'errorMessage'
  > &
    AdapterProps<FormValues> & {
      formatError?: (error: FieldError) => undefined | string;
    };
