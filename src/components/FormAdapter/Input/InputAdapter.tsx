import { useController } from 'react-hook-form';
import { InputAdapterProps } from './types';
import AccessibleInput from '../../AccessibleForm/Input';
import { InputValue } from '../../Form/Input';

const InputAdapter = <FormValues,>(
    {
        name,
        type,
        placeholder,
        required,
        disabled,
        valueGetter,
        readOnly,
        label,
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
            type={type}
            value={fieldValues}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            onBlur={onBlur}
            onChange={onChange}
            valueGetter={valueGetter}
            label={label}
            readOnly={readOnly}
        />
    );
};

export default InputAdapter;