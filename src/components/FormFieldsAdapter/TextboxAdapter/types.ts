import { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import {
  TextboxFormFieldProps,
  TextboxWithCollapseFormFieldProps,
} from '../../FormFields';

type AdapterProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  control: Control<FormValues>;
};

export type TextboxAdapterProps<FormValues extends FieldValues> = Omit<
  TextboxFormFieldProps,
  'onChange' | 'onBlur' | 'value' | 'name' | 'isValid' | 'errorMessage'
> &
  AdapterProps<FormValues> & {
    formatError?: (error: FieldError) => undefined | string;
  };

export type TextboxWithCollapseAdapterProps<FormValues extends FieldValues> =
  Omit<
    TextboxWithCollapseFormFieldProps,
    'onChange' | 'onBlur' | 'value' | 'name' | 'isValid' | 'errorMessage'
  > &
    AdapterProps<FormValues> & {
      formatError?: (error: FieldError) => undefined | string;
    };
