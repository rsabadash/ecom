import { FieldValues, useController } from 'react-hook-form';

import { InputFormValue, InputValue } from '../../Fields/Input';
import { InputFormField } from '../../FormFields';
import { useFieldErrorMessage } from '../hooks';
import { InputAdapterProps } from './types';

export const InputAdapter = <FormValues extends FieldValues>({
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
  onIconClick,
  valueGetter,
  formatValue,
  formatError,
  Icon,
  iconId,
  iconAriaLabel,
  inputClassName,
  isLabelHidden,
  isDescriptionHidden,
  label,
  control,
  columnIndex,
}: InputAdapterProps<FormValues>) => {
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

  const fieldErrorMessage = useFieldErrorMessage({
    error,
    formatError,
  });

  const fieldValue = value as InputValue;

  const handleOnChange = (value: InputFormValue): void => {
    onChange && onChange(value);
    onChangeField(value);
  };

  const handleOnBlur = (value: InputFormValue): void => {
    onBlur && onBlur(value);
    onBlurField();
  };

  return (
    <InputFormField
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
      onIconClick={onIconClick}
      valueGetter={valueGetter}
      formatValue={formatValue}
      Icon={Icon}
      iconId={iconId}
      iconAriaLabel={iconAriaLabel}
      inputClassName={inputClassName}
      errorMessage={fieldErrorMessage}
      isLabelHidden={isLabelHidden}
      isDescriptionHidden={isDescriptionHidden}
      label={label}
      columnIndex={columnIndex}
    />
  );
};
