import { FieldValues, useController } from 'react-hook-form';
import { TextboxAdapterProps } from './types';
import { TextboxFormField } from '../../FormFields';
import { TextboxValue } from '../../Fields/Textbox';
import { useTranslation } from '../../IntlProvider';

const TextboxAdapter = <FormValues extends FieldValues>(
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
    }: TextboxAdapterProps<FormValues>
) => {
    const {
        field: { onChange, onBlur, name: fieldName, value },
        fieldState: { error }
    } = useController<FormValues>({
        name,
        control,
        // @ts-ignore
        defaultValue: null
    });

    const { translate } = useTranslation();

    const fieldValue = value as TextboxValue;
    const fieldErrorMessage = error && formatError ? formatError(error) : error?.message && translate(error.message);

    return (
        <TextboxFormField
            name={fieldName}
            value={fieldValue}
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

export { TextboxAdapter };