import { useController } from 'react-hook-form';
import { InputAdapterProps } from './types';
import AccessibleInput from '../../AccessibleForm/Input';
import { InputValue } from '../../Form/Input';

const InputAdapter = <FormValues,>(
    {
        name,
        type,
        placeholder,
        isReadOnly,
        isRequired,
        isDisabled,
        valueGetter,
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

    const fieldValue = value as InputValue;

    return (
        <AccessibleInput
            name={fieldName}
            type={type}
            value={fieldValue}
            placeholder={placeholder}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
            isDisabled={isDisabled}
            onBlur={onBlur}
            onChange={onChange}
            valueGetter={valueGetter}
            label={label}
        />
    );
};

export default InputAdapter;