import { FieldValues, useController } from 'react-hook-form';

import { InputFormValue, InputValue } from '../../Fields/Input';
import { InputWithTooltipFormField } from '../../FormFields';
import { useFieldErrorMessage } from '../hooks';
import { InputWithTooltipAdapterProps } from './types';

export const InputWithTooltipAdapter = <FormValues extends FieldValues>({
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
  ariaLabel,
  iconAriaLabel,
  inputClassName,
  position,
  control,
}: InputWithTooltipAdapterProps<FormValues>) => {
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
    <InputWithTooltipFormField
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
      ariaLabel={ariaLabel}
      iconAriaLabel={iconAriaLabel}
      inputClassName={inputClassName}
      errorMessage={fieldErrorMessage}
      position={position}
    />
  );
};
