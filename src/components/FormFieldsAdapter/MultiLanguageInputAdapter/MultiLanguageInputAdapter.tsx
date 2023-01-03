import { Path, useFormState } from 'react-hook-form';
import { MultiLanguageInputAdapterProps } from './types';
import { getPlaceholder } from './utils';
import { InputAdapter } from '../InputAdapter';
import { MultiLanguage } from '../../Fields/MultiLanguage';
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

    const ariaLabelValue = translate('translations.field', {
        field: typeof label === 'string' ? label : name
    });

    return (
        <div>
            <MultiLanguage
                name={name}
                forceExpand={hasMultiLanguageError}
                isReadOnly={isReadOnly}
                ariaLabel={ariaLabelValue}
                ariaControls={`${name}Controls`}
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