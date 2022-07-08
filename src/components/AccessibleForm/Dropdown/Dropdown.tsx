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
    const { language } = useTranslation();
    const readOnlyValue = isReadOnly ? getReadOnlyValue({ value, language }) : '';

    return (
        <div>
            <AccessibleLabel
                label={label}
                htmlFor={name}
                isRequired={isRequired}
                isReadOnly={isReadOnly}
            />
            {isReadOnly
                ? <ReadOnlyField value={readOnlyValue} />
                : <Dropdown
                    name={name}
                    value={value}
                    items={items}
                    customItems={customItems}
                    placeholder={placeholder}
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
            }
        </div>
    );
});

AccessibleDropdown.displayName = 'AccessibleDropdown';

export default AccessibleDropdown;