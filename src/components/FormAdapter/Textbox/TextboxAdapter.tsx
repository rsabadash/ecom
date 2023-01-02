import { useController } from 'react-hook-form';
import { TextboxAdapterProps } from './types';
import AccessibleTextbox from '../../AccessibleForm/Textbox';
import { TextboxValue } from '../../Form/Textbox';
import { useTranslation } from '../../IntlProvider';

const TextboxAdapter = <FormValues,>(
    {
        name,
        placeholder,
        isReadOnly,
        isRequired,
        isDisabled,
        errorFormatter,
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
    });

    const { translate } = useTranslation();

    const fieldValue = value as TextboxValue;
    const fieldErrorMessage = error && errorFormatter ? errorFormatter(error) : error?.message && translate(error.message);

    return (
        <AccessibleTextbox
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

export default TextboxAdapter;