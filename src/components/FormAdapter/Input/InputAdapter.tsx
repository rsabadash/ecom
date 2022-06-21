import { useController } from 'react-hook-form';
import { InputAdapterProps } from './types';
import AccessibleInput from '../../AccessibleForm/Input';
import { InputValue } from '../../Form/Input';

const InputAdapter = <FormValues,>(
    {
        name,
        disabled,
        required,
        placeholder,
        label,
        type,
        control,
    }: InputAdapterProps<FormValues>
) => {
    const {
        field: { onChange, onBlur, name: fieldName, value },
    } = useController<FormValues>({
        name,
        control,
    });

    const fieldValues = value as InputValue;

    return (
        <AccessibleInput
            name={fieldName}
            value={fieldValues}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            label={label}
            placeholder={placeholder}
            type={type}
        />
    );
};

export default InputAdapter;