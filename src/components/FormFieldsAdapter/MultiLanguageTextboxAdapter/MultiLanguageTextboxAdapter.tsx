import { Path, useFormState } from 'react-hook-form';
import { MultiLanguageTextboxAdapterProps } from './types';
import { getPlaceholder } from './utils';
import { TextboxAdapter } from '../TextboxAdapter';
import { MultiLanguage } from '../../Fields/MultiLanguage';
import { DEFAULT_LANGUAGE, useTranslation } from '../../IntlProvider';

const MultiLanguageTextboxAdapter = <FormValues,>(
    {
        name,
        placeholder,
        isReadOnly,
        isRequired,
        isDisabled,
        isRequiredAllLanguage,
        label,
        control,
    }: MultiLanguageTextboxAdapterProps<FormValues>
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
                renderComponent={({ languagePostfixName, language }) => (
                    <TextboxAdapter
                        name={(languagePostfixName as Path<FormValues>)}
                        placeholder={getPlaceholder({ placeholder, language, translate })}
                        isReadOnly={isReadOnly}
                        isRequired={isRequiredAllLanguage || (DEFAULT_LANGUAGE === language && isRequired)}
                        isDisabled={isDisabled}
                        isDescriptionHidden={isReadOnly}
                        label={label}
                        control={control}
                    />
                )}
            />
        </div>
    );
};

export { MultiLanguageTextboxAdapter };