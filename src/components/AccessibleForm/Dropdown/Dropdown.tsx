import { forwardRef } from 'react';
import Dropdown  from '../../Form/Dropdown/Dropdown';
import { AccessibleDropdownProps } from './types';
import AccessibleLabel from '../Label';

const AccessibleDropdown = forwardRef<HTMLInputElement, AccessibleDropdownProps>((
    {
        name,
        value,
        items,
        customItems,
        placeholder,
        isRequired,
        isDisabled,
        isOpen,
        hasMultiselect,
        onBlur,
        onChange,
        itemValueGetter,
        isReadOnly,
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
            <Dropdown
                name={name}
                value={value}
                items={items}
                customItems={customItems}
                placeholder={placeholder}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
                isDisabled={isDisabled}
                isOpen={isOpen}
                hasMultiselect={hasMultiselect}
                onBlur={onBlur}
                onChange={onChange}
                itemValueGetter={itemValueGetter}
                ariaLabelledBy={name}
                ref={ref}
            />
        </div>
    );
});

AccessibleDropdown.displayName = 'AccessibleDropdown';

export default AccessibleDropdown;