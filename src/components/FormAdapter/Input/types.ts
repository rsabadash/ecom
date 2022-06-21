import { Control, Path } from 'react-hook-form';
import { AccessibleInputProps } from '../../AccessibleForm/Input';

export type InputAdapterProps<FormValues> =
    Omit<AccessibleInputProps, 'onChange' | 'onBlur' | 'value' | 'name' | 'invalid'> & {
    name: Path<FormValues>,
    control: Control<FormValues>;
};