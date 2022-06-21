import { useController } from 'react-hook-form';
import { DropdownAdapterProps } from './types';
import AccessibleDropdown from '../../AccessibleForm/Dropdown';
import { DropdownItem } from '../../Form/Dropdown';

const DropdownAdapter = <FormValues,>(
    {
        name,
        items,
        disabled,
        required,
        open,
        placeholder,
        multiselect,
        sendValue,
        label,
        control,
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
            onChange={onChange}
            onBlur={onBlur}
            items={items}
            disabled={disabled}
            required={required}
            open={open}
            placeholder={placeholder}
            multiselect={multiselect}
            sendValue={sendValue}
            label={label}
        />
    );
};

export default DropdownAdapter;