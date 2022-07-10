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
        isReadOnly,
        isRequired,
        isDisabled,
        onBlur,
        onChange,
        valueGetter,
        label
    },
    ref
) => {
    return (
        <div>
            <AccessibleLabel
                label={label}
                htmlFor={name}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
            />
            <Input
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
                isDisabled={isDisabled}
                onBlur={onBlur}
                onChange={onChange}
                valueGetter={valueGetter}
                ref={ref}
            />
        </div>
    );
});

AccessibleInput.displayName = 'AccessibleInput';

export default AccessibleInput;