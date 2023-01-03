import { Control, FieldError, Path } from 'react-hook-form';
import { DropdownFormFieldProps } from '../../FormFields';

type AdapterProps<FormValues> = {
    name: Path<FormValues>,
    control: Control<FormValues>;
};

export type DropdownAdapterProps<FormValues> =
    Omit<DropdownFormFieldProps, 'onChange' | 'onBlur' | 'value' | 'name' | 'isValid'>
    & AdapterProps<FormValues>
    & {
        errorFormatter?: (error: FieldError) => undefined | string;
    };