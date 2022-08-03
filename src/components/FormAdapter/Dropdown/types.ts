import {Control, FieldError, Path} from 'react-hook-form';
import { AccessibleDropdownProps } from '../../AccessibleForm/Dropdown';

type AdapterProps<FormValues> = {
    name: Path<FormValues>,
    control: Control<FormValues>;
};

export type DropdownAdapterProps<FormValues> =
    Omit<AccessibleDropdownProps, 'onChange' | 'onBlur' | 'value' | 'name' | 'isValid'>
    & AdapterProps<FormValues>
    & {
        errorFormatter?: (error: FieldError) => undefined | string;
    };