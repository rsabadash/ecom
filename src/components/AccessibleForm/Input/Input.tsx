import { forwardRef } from 'react';
import Input  from '../../Form/Input';
import { AccessibleInputProps } from './types';
import AccessibleLabel from '../Label';

const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>((
    {
        name,
        type,
        value,
        placeholder,
        disabled,
        required,
        label,
        onBlur,
        onChange,
    },
    ref
) => {
    return (
        <div>
            <AccessibleLabel
                label={label}
                htmlFor={name}
                required={required}
            />
            <Input
                ref={ref}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                required={required}
            />
        </div>
    );
});

AccessibleInput.displayName = 'AccessibleInput';

export default AccessibleInput;