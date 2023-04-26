import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from '../../IntlProvider';
import { InputWithCollapseFormField } from '../../FormFields';
import { InputWithCollapseAdapterProps } from './types';
import { InputFormValue, InputValue } from '../../Fields/Input';

export const InputWithCollapseAdapter = <FormValues extends FieldValues>({
  name,
  type,
  size,
  placeholder,
  isReadOnly,
  isRequired,
  isDisabled,
  onBlur,
  onFocus,
  onChange,
  valueGetter,
  formatValue,
  formatError,
  isLabelHidden,
  isDescriptionHidden,
  label,
  control,
  columnIndex,
  isToggleHidden,
}: InputWithCollapseAdapterProps<FormValues>) => {
  const {
    field: {
      onChange: onChangeField,
      onBlur: onBlurField,
      name: fieldName,
      value,
    },
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

  const handleOnChange = (value: InputFormValue) => {
    onChange && onChange(value);
    onChangeField(value);
  };

  const handleOnBlur = (value: InputFormValue) => {
    onBlur && onBlur(value);
    onBlurField();
  };

  return (
    <InputWithCollapseFormField
      name={fieldName}
      type={type}
      size={size}
      value={fieldValue}
      placeholder={placeholder}
      isValid={!fieldErrorMessage}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isDisabled={isDisabled}
      onBlur={handleOnBlur}
      onFocus={onFocus}
      onChange={handleOnChange}
      valueGetter={valueGetter}
      formatValue={formatValue}
      errorMessage={fieldErrorMessage}
      isLabelHidden={isLabelHidden}
      isDescriptionHidden={isDescriptionHidden}
      label={label}
      columnIndex={columnIndex}
      isToggleHidden={isToggleHidden}
    />
  );
};
