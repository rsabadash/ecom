import { Control, FieldError, Path } from 'react-hook-form';
import { InputFormFieldProps } from '../../FormFields';

type AdapterProps<FormValues> = {
    name: Path<FormValues>,
    control: Control<FormValues>;
};

export type InputAdapterProps<FormValues> =
    Omit<InputFormFieldProps, 'onChange' | 'onBlur' | 'value' | 'name' | 'isValid' | 'errorMessage'>
    & AdapterProps<FormValues>
    & {
        errorFormatter?: (error: FieldError) => undefined | string;
    };