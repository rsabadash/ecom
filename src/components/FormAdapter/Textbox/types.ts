import {Control, FieldError, Path} from 'react-hook-form';
import { AccessibleTextboxProps } from '../../AccessibleForm/Textbox';

type AdapterProps<FormValues> = {
    name: Path<FormValues>,
    control: Control<FormValues>;
};

export type TextboxAdapterProps<FormValues> =
    Omit<AccessibleTextboxProps, 'onChange' | 'onBlur' | 'value' | 'name' | 'isValid'>
    & AdapterProps<FormValues>
    & {
        errorFormatter?: (error: FieldError) => undefined | string;
    };