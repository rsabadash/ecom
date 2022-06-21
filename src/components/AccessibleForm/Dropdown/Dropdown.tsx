import { forwardRef } from 'react';
import Dropdown  from '../../Form/Dropdown';
import { AccessibleDropdownProps } from './types';
import AccessibleLabel from '../Label';

const AccessibleDropdown = forwardRef<HTMLInputElement, AccessibleDropdownProps>((
    {
        name,
        items,
        value,
        placeholder,
        open,
        multiselect,
        sendValue,
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
            <Dropdown
                ref={ref}
                name={name}
                items={items}
                value={value}
                placeholder={placeholder}
                open={open}
                multiselect={multiselect}
                sendValue={sendValue}
                required={required}
                disabled={disabled}
                onBlur={onBlur}
                onChange={onChange}
                ariaLabelledBy={name}
            />
        </div>
    );
});

AccessibleDropdown.displayName = 'AccessibleDropdown';

export default AccessibleDropdown;