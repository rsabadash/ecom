import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from '../../IntlProvider';
import { InputWithCollapseFormField } from '../../FormFields';
import { InputWithCollapseAdapterProps } from './types';
import { InputValue } from '../../Fields/Input';

export const InputWithCollapseAdapter = <FormValues extends FieldValues>({
  name,
  type,
  placeholder,
  isReadOnly,
  isRequired,
  isDisabled,
  valueGetter,
  formatValue,
  formatError,
  isDescriptionHidden,
  label,
  control,
  columnIndex,
  ariaLabel,
  ariaControls,
  forceExpand,
  isToggleHidden,
  isInitiallyExpand,
  collapseBodyRef,
}: InputWithCollapseAdapterProps<FormValues>) => {
  const {
    field: { onChange, onBlur, name: fieldName, value },
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    defaultValue: null,
  });

  const { translate } = useTranslation();

  const fieldValue = value as InputValue;
  const fieldErrorMessage =
    error && formatError
      ? formatError(error)
      : error?.message && translate(error.message);

  return (
    <InputWithCollapseFormField
      name={fieldName}
      type={type}
      value={fieldValue}
      placeholder={placeholder}
      isValid={!fieldErrorMessage}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isDisabled={isDisabled}
      onBlur={onBlur}
      onChange={onChange}
      valueGetter={valueGetter}
      formatValue={formatValue}
      errorMessage={fieldErrorMessage}
      isDescriptionHidden={isDescriptionHidden}
      label={label}
      columnIndex={columnIndex}
      ariaLabel={ariaLabel}
      ariaControls={ariaControls}
      forceExpand={forceExpand}
      isToggleHidden={isToggleHidden}
      isInitiallyExpand={isInitiallyExpand}
      collapseBodyRef={collapseBodyRef}
    />
  );
};
