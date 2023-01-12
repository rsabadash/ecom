import { FieldValues, Path, useFormState } from 'react-hook-form';
import { MultiLanguageTextboxAdapterProps } from './types';
import { addLanguageToTranslation } from '../utils';
import { TextboxAdapter } from '../TextboxAdapter';
import { MultiLanguage } from '../../Fields/MultiLanguage';
import { DEFAULT_LANGUAGE, useTranslation } from '../../IntlProvider';

const MultiLanguageTextboxAdapter = <FormValues extends FieldValues>(
    {
        name,
        placeholderTranslation,
        isReadOnly,
        isRequired,
        isDisabled,
        isToggleHidden,
        isInitiallyExpand,
        isDescriptionHidden,
        isRequiredAllLanguages,
        label,
        control,
    }: MultiLanguageTextboxAdapterProps<FormValues>
) => {
    const { translate } = useTranslation();
    const { errors } = useFormState<FormValues>({ control });

    // @ts-ignore
    const hasMultiLanguageError = errors[name] && Object.keys(errors[name]).some((errorLanguage) => errorLanguage !== DEFAULT_LANGUAGE);

    const ariaLabelValue = translate('translations.field', {
        field: typeof label === 'string' ? label : name
    });

    return (
        <div>
            <MultiLanguage
                name={name}
                isInitiallyExpand={isInitiallyExpand}
                forceExpand={hasMultiLanguageError}
                isToggleHidden={isToggleHidden}
                ariaLabel={ariaLabelValue}
                ariaControls={`${name}Controls`}
                renderComponent={({ languagePostfixName, language }) => (
                    <TextboxAdapter
                        name={(languagePostfixName as Path<FormValues>)}
                        placeholder={addLanguageToTranslation({ translation: placeholderTranslation, language, translate })}
                        isReadOnly={isReadOnly}
                        isRequired={isRequiredAllLanguages || (DEFAULT_LANGUAGE === language && isRequired)}
                        isDisabled={isDisabled}
                        formatError={(error) => addLanguageToTranslation({ translation: error.message, language, translate })}
                        isDescriptionHidden={isDescriptionHidden}
                        label={`${label} (${translate(`${language}.adjective`)})`}
                        control={control}
                    />
                )}
            />
        </div>
    );
};

export { MultiLanguageTextboxAdapter };