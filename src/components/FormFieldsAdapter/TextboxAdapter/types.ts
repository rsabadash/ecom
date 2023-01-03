import { Control, FieldError, Path } from 'react-hook-form';
import { TextboxFormFieldProps } from '../../FormFields';

type AdapterProps<FormValues> = {
    name: Path<FormValues>,
    control: Control<FormValues>;
};

export type TextboxAdapterProps<FormValues> =
    Omit<TextboxFormFieldProps, 'onChange' | 'onBlur' | 'value' | 'name' | 'isValid'>
    & AdapterProps<FormValues>
    & {
        errorFormatter?: (error: FieldError) => undefined | string;
    };