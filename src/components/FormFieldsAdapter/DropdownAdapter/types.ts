import { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { DropdownFormFieldProps } from '../../FormFields';

type AdapterProps<FormValues extends FieldValues> = {
    name: Path<FormValues>,
    control: Control<FormValues>;
};

export type DropdownAdapterProps<FormValues extends FieldValues> =
    Omit<DropdownFormFieldProps, 'onChange' | 'onBlur' | 'value' | 'name' | 'isValid'>
    & AdapterProps<FormValues>
    & {
        formatError?: (error: FieldError) => undefined | string;
    };