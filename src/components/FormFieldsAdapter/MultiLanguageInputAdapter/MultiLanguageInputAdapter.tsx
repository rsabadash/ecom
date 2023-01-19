import { FieldValues, Path, useFormState } from 'react-hook-form';
import { MultiLanguageInputAdapterProps } from './types';
import { addLanguageToTranslation } from '../utils';
import { InputAdapter } from '../InputAdapter';
import { MultiLanguage } from '../../Fields/MultiLanguage';
import { DEFAULT_LANGUAGE, useTranslation } from '../../IntlProvider';

export const MultiLanguageInputAdapter = <FormValues extends FieldValues>({
  name,
  type,
  placeholderTranslation,
  isReadOnly,
  isRequired,
  isDisabled,
  valueGetter,
  formatValue,
  isToggleHidden,
  isInitiallyExpand,
  isDescriptionHidden,
  isRequiredAllLanguages,
  label,
  control,
}: MultiLanguageInputAdapterProps<FormValues>) => {
  const { translate } = useTranslation();
  const { errors } = useFormState<FormValues>({ control });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const hasMultiLanguageError =
    errors[name] &&
    Object.keys(errors[name]).some(
      (errorLanguage) => errorLanguage !== DEFAULT_LANGUAGE,
    );

  const ariaLabelValue = translate('translations.field', {
    field: typeof label === 'string' ? label : name,
  });

  return (
    <div>
      <MultiLanguage
        name={name}
        forceExpand={hasMultiLanguageError}
        isInitiallyExpand={isInitiallyExpand}
        isToggleHidden={isToggleHidden}
        ariaLabel={ariaLabelValue}
        ariaControls={`${name}Controls`}
        renderComponent={({ language, languagePostfixName }) => (
          <InputAdapter
            name={languagePostfixName as Path<FormValues>}
            type={type}
            placeholder={addLanguageToTranslation({
              translation: placeholderTranslation,
              language,
              translate,
            })}
            isReadOnly={isReadOnly}
            isRequired={
              isRequiredAllLanguages ||
              (DEFAULT_LANGUAGE === language && isRequired)
            }
            isDisabled={isDisabled}
            valueGetter={valueGetter}
            formatValue={formatValue}
            formatError={(error) =>
              addLanguageToTranslation({
                translation: error.message,
                language,
                translate,
              })
            }
            isDescriptionHidden={isDescriptionHidden}
            label={`${label} (${translate(`${language}.adjective`)})`}
            control={control}
          />
        )}
      />
    </div>
  );
};
