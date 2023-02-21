import { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { CheckboxFormFieldProps } from '../../FormFields';

type AdapterProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  control: Control<FormValues>;
};

export type CheckboxAdapterProps<FormValues extends FieldValues> = Omit<
  CheckboxFormFieldProps,
  'isChecked' | 'onChange' | 'onBlur' | 'name' | 'isValid' | 'errorMessage'
> &
  AdapterProps<FormValues> & {
    onChange?: CheckboxFormFieldProps['onChange'];
    formatError?: (error: FieldError) => undefined | string;
  };
