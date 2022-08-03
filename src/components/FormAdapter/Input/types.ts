import { Control, FieldError, Path } from 'react-hook-form';
import { AccessibleInputProps } from '../../AccessibleForm/Input';

type AdapterProps<FormValues> = {
    name: Path<FormValues>,
    control: Control<FormValues>;
};

export type InputAdapterProps<FormValues> =
    Omit<AccessibleInputProps, 'onChange' | 'onBlur' | 'value' | 'name' | 'isValid' | 'errorMessage'>
    & AdapterProps<FormValues>
    & {
        errorFormatter?: (error: FieldError) => undefined | string;
    };