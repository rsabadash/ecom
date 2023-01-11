import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from '../../IntlProvider';
import { CheckboxFormField } from '../../FormFields';
import { CheckboxAdapterProps } from './types';
import { CheckboxValue } from '../../Fields/Checkbox/types';

const CheckboxAdapter = <FormValues extends FieldValues>(
    {
        name,
        placeholder,
        isReadOnly,
        isRequired,
        isDisabled,
        formatError,
        isDescriptionHidden,
        label,
        control,
    }: CheckboxAdapterProps<FormValues>
) => {
    const {
        field: { onChange, onBlur, name: fieldName, value },
        fieldState: { error }
    } = useController<FormValues>({
        name,
        control,
        // @ts-ignore
        defaultValue: false
    });

    const { translate } = useTranslation();

    const fieldValue = value as CheckboxValue;
    const fieldErrorMessage = error && formatError ? formatError(error) : error?.message && translate(error.message);

    return (
        <CheckboxFormField
            name={fieldName}
            isChecked={fieldValue}
            placeholder={placeholder}
            isValid={!fieldErrorMessage}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
            isDisabled={isDisabled}
            onBlur={onBlur}
            onChange={onChange}
            errorMessage={fieldErrorMessage}
            isDescriptionHidden={isDescriptionHidden}
            label={label}
        />
    );
};

export { CheckboxAdapter };