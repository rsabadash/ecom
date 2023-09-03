import { FieldValues, Path, useFormState } from 'react-hook-form';

import { DEFAULT_LANGUAGE, useTranslation } from '../../IntlProvider';
import { MultiLanguage } from '../../MultiLanguage';
import { useAddLanguageToTranslation } from '../hooks';
import { InputAdapter, InputWithCollapseAdapter } from '../InputAdapter';
import { MultiLanguageInputAdapterProps } from './types';

export const MultiLanguageInputAdapter = <FormValues extends FieldValues>({
  size,
  name,
  placeholderTranslation,
  isReadOnly,
  isRequired,
  isDisabled,
  onFocus,
  valueGetter,
  formatValue,
  isToggleHidden,
  isInitiallyExpand,
  isLabelHidden,
  isDescriptionHidden,
  isRequiredAllLanguages,
  label,
  control,
  columnIndex,
}: MultiLanguageInputAdapterProps<FormValues>) => {
  const { translate } = useTranslation();
  const { addLanguageToTranslation } = useAddLanguageToTranslation();
  const { errors } = useFormState<FormValues>({ control });

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
    size,
    isReadOnly,
    isDisabled,
    onFocus,
    valueGetter,
    formatValue,
    isLabelHidden,
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
        <InputWithCollapseAdapter
          {...commonProps}
          name={`${name}.${language}` as Path<FormValues>}
          isRequired={isRequired}
          placeholder={addLanguageToTranslation({
            translation: placeholderTranslation,
            language,
          })}
          formatError={({ message }) => {
            if (typeof message === 'string') {
              return addLanguageToTranslation({
                translation: message,
                language,
              });
            }

            return 'Message type is not supported';
          }}
          label={`${label} (${translate(`${language}.adjective`)})`}
          columnIndex={columnIndex}
          isToggleHidden={isToggleHidden}
        />
      )}
      renderHiddenComponent={({ language }) => (
        <InputAdapter
          key={language}
          {...commonProps}
          name={`${name}.${language}` as Path<FormValues>}
          isRequired={isRequiredAllLanguages}
          placeholder={addLanguageToTranslation({
            translation: placeholderTranslation,
            language,
          })}
          formatError={({ message }) => {
            if (typeof message === 'string') {
              return addLanguageToTranslation({
                translation: message,
                language,
              });
            }

            return 'Message type is not supported';
          }}
          label={`${label} (${translate(`${language}.adjective`)})`}
          columnIndex={0}
        />
      )}
    />
  );
};
