import { Path, useFormState } from 'react-hook-form';
import { MultiLanguageTextboxAdapterProps } from './types';
import { getPlaceholder } from './utils';
import TextboxAdapter from '../Textbox';
import MultiLanguage from '../../Form/MultiLanguage';
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

    return (
        <div>
            <MultiLanguage
                name={name}
                forceOpen={hasMultiLanguageError}
                isReadOnly={isReadOnly}
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