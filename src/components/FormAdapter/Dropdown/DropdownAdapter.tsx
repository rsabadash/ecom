import { useController } from 'react-hook-form';
import { DropdownAdapterProps } from './types';
import AccessibleDropdown from '../../AccessibleForm/Dropdown';
import { DropdownItem } from '../../Form/Dropdown';

const DropdownAdapter = <FormValues,>(
    {
        name,
        items,
        customItems,
        placeholder,
        isReadOnly,
        isRequired,
        isDisabled,
        isOpen,
        hasMultiselect,
        itemValueGetter,
        label,
        control
    }: DropdownAdapterProps<FormValues>
) => {
    const {
        field: { onChange, onBlur, name: fieldName, value },
    } = useController<FormValues>({
        name,
        control,
    });

    const fieldValues = value as DropdownItem;

    return (
        <AccessibleDropdown
            name={fieldName}
            value={fieldValues}
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
            label={label}
        />
    );
};

export default DropdownAdapter;