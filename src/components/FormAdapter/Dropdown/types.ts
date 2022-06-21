import { Control, Path } from 'react-hook-form';
import { AccessibleDropdownProps } from '../../AccessibleForm/Dropdown';

export type DropdownAdapterProps<FormValues> =
    Omit<AccessibleDropdownProps, 'onChange' | 'onBlur' | 'value' | 'name' | 'invalid'> & {
    name: Path<FormValues>,
    control: Control<FormValues>;
};