import { Control, FieldError, Path } from 'react-hook-form';
import { CheckboxFormFieldProps } from '../../FormFields';

type AdapterProps<FormValues> = {
    name: Path<FormValues>,
    control: Control<FormValues>;
};

export type CheckboxAdapterProps<FormValues> =
    Omit<CheckboxFormFieldProps, 'isChecked' | 'onChange' | 'onBlur' | 'name' | 'isValid' | 'errorMessage'>
    & AdapterProps<FormValues>
    & {
        formatError?: (error: FieldError) => undefined | string;
    };