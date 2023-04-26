import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from '../../IntlProvider';
import { InputWithTooltipFormField } from '../../FormFields';
import { InputWithTooltipAdapterProps } from './types';
import { InputFormValue, InputValue } from '../../Fields/Input';

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
