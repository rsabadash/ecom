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
        required,
        disabled,
        open,
        multiselect,
        itemValueGetter,
        readOnly,
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
            required={required}
            disabled={disabled}
            open={open}
            multiselect={multiselect}
            onBlur={onBlur}
            onChange={onChange}
            itemValueGetter={itemValueGetter}
            readOnly={readOnly}
            label={label}
        />
    );
};

export default DropdownAdapter;