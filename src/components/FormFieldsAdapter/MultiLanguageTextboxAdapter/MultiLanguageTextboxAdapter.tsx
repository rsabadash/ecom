import { FieldValues, Path, useFormState } from 'react-hook-form';
import { DEFAULT_LANGUAGE, useTranslation } from '../../IntlProvider';
import { TextboxAdapter, TextboxWithCollapseAdapter } from '../TextboxAdapter';
import { MultiLanguage } from '../../MultiLanguage';
import { MultiLanguageTextboxAdapterProps } from './types';
import { useAddLanguageToTranslation } from '../hooks';

export const MultiLanguageTextboxAdapter = <FormValues extends FieldValues>({
  name,
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
  columnIndex,
}: MultiLanguageTextboxAdapterProps<FormValues>) => {
  const { translate } = useTranslation();
  const { errors } = useFormState<FormValues>({ control });
  const { addLanguageToTranslation } = useAddLanguageToTranslation();

  const hasMultiLanguageError =
    errors[name] &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.keys(errors[name]).some(
      (errorLanguage) => errorLanguage !== DEFAULT_LANGUAGE,
    );

  const ariaControls = `${name}Controls`;
  const ariaLabelValue = translate('translations.field', {
    field: typeof label === 'string' ? label : name,
  });

  const commonProps = {
    isReadOnly,
    isDisabled,
    valueGetter,
    formatValue,
    isDescriptionHidden,
    control,
  };

  return (
    <MultiLanguage
      columnIndex={columnIndex}
      collapseBodyId={ariaControls}
      ariaLabel={ariaLabelValue}
      ariaControls={ariaControls}
      forceExpand={hasMultiLanguageError}
      isInitiallyExpand={isInitiallyExpand}
      renderVisibleComponent={({ language }) => (
        <TextboxWithCollapseAdapter
          {...commonProps}
          name={`${name}.${language}` as Path<FormValues>}
          isRequired={isRequired}
          placeholder={addLanguageToTranslation({
            translation: placeholderTranslation,
            language,
          })}
          formatError={({ message }) =>
            addLanguageToTranslation({ translation: message, language })
          }
          label={`${label} (${translate(`${language}.adjective`)})`}
          columnIndex={columnIndex}
          isToggleHidden={isToggleHidden}
        />
      )}
      renderHiddenComponent={({ language }) => (
        <TextboxAdapter
          {...commonProps}
          key={language}
          name={`${name}.${language}` as Path<FormValues>}
          isRequired={isRequiredAllLanguages}
          placeholder={addLanguageToTranslation({
            translation: placeholderTranslation,
            language,
          })}
          formatError={({ message }) =>
            addLanguageToTranslation({ translation: message, language })
          }
          label={`${label} (${translate(`${language}.adjective`)})`}
          columnIndex={0}
        />
      )}
    />
  );
};
