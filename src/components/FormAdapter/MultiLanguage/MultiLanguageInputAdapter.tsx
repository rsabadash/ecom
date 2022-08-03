import { Path, useFormState } from 'react-hook-form';
import { MultiLanguageInputAdapterProps} from './types';
import { getPlaceholder } from './utils';
import InputAdapter from '../Input';
import MultiLanguage from '../../Form/MultiLanguage';
import { DEFAULT_LANGUAGE, useTranslation } from '../../IntlProvider';

const MultiLanguageInputAdapter = <FormValues,>(
    {
        name,
        type,
        placeholder,
        isReadOnly,
        isRequired,
        isDisabled,
        valueGetter,
        formatValue,
        isRequiredAllLanguage,
        label,
        control,
    }: MultiLanguageInputAdapterProps<FormValues>
) => {
    const { translate } = useTranslation();
    const { errors } = useFormState<FormValues>({ control });

    const hasMultiLanguageError = isRequiredAllLanguage
        // @ts-ignore
        ? !!errors[name]
        : Object.keys(errors).some((errorLanguage) => errorLanguage === DEFAULT_LANGUAGE);

    return (
        <div>
            <MultiLanguage
                name={name}
                forceOpen={hasMultiLanguageError}
                isReadOnly={isReadOnly}
                renderComponent={({ language, languagePostfixName }) => (
                    <InputAdapter
                        name={(languagePostfixName as Path<FormValues>)}
                        type={type}
                        placeholder={getPlaceholder({ placeholder, language, translate })}
                        isReadOnly={isReadOnly}
                        isRequired={isRequiredAllLanguage || (DEFAULT_LANGUAGE === language && isRequired)}
                        isDisabled={isDisabled}
                        valueGetter={valueGetter}
                        formatValue={formatValue}
                        isDescriptionHidden={isReadOnly}
                        label={label}
                        control={control}
                    />
                )}
            />
        </div>
    );
};

export { MultiLanguageInputAdapter };