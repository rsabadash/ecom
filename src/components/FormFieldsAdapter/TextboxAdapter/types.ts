import { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { TextboxFormFieldProps } from '../../FormFields';

type AdapterProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  control: Control<FormValues>;
};

export type TextboxAdapterProps<FormValues extends FieldValues> = Omit<
  TextboxFormFieldProps,
  'onChange' | 'onBlur' | 'value' | 'name' | 'isValid'
> &
  AdapterProps<FormValues> & {
    formatError?: (error: FieldError) => undefined | string;
  };
