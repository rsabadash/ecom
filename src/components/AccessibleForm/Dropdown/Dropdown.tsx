import { forwardRef } from 'react';
import Dropdown  from '../../Form/Dropdown/Dropdown';
import { AccessibleDropdownProps } from './types';
import AccessibleLabel from '../Label';
import ReadOnlyField from '../ReadOnlyField';
import { useTranslation } from '../../IntlProvider';
import { getReadOnlyValue } from './utils';

const AccessibleDropdown = forwardRef<HTMLInputElement, AccessibleDropdownProps>((
    {
        name,
        value,
        items,
        customItems,
        placeholder,
        required,
        disabled,
        open,
        multiselect,
        onBlur,
        onChange,
        itemValueGetter,
        readOnly,
        label
    },
    ref
) => {
    const { language } = useTranslation();
    const readOnlyValue = readOnly ? getReadOnlyValue({ value, language }) : '';

    return (
        <div>
            <AccessibleLabel
                label={label}
                htmlFor={name}
                required={required}
                readOnly={readOnly}
            />
            {readOnly
                ? <ReadOnlyField value={readOnlyValue} />
                : <Dropdown
                    name={name}
                    value={value}
                    items={items}
                    customItems={customItems}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    open={open}
                    multiselect={multiselect}
                    onBlur={onBlur}
                    onChange={onChange}
                    itemValueGetter={itemValueGetter}
                    ariaLabelledBy={name}
                    ref={ref}
                />
            }
        </div>
    );
});

AccessibleDropdown.displayName = 'AccessibleDropdown';

export default AccessibleDropdown;