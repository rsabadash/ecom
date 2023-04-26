import { FC } from 'react';
import { Input } from '../../Fields/Input';
import { InputFormFieldProps } from './types';
import { CommonFormFieldsWrapper } from '../CommonFormFieldWrapper';

export const InputFormField: FC<InputFormFieldProps> = ({
  name,
  type,
  size,
  value,
  placeholder,
  isValid,
  isReadOnly,
  isRequired,
  isDisabled,
  onBlur,
  onChange,
  onIconClick,
  valueGetter,
  formatValue,
  Icon,
  iconId,
  iconAriaLabel,
  inputClassName,
  errorMessage,
  isLabelHidden,
  ariaLabel,
  isDescriptionHidden,
  label,
  columnIndex,
}) => {
  const describedById = `${name}Description`;
  const fieldAriaLabel = isLabelHidden
    ? ariaLabel || (typeof label === 'string' ? label : undefined)
    : undefined;

  return (
    <CommonFormFieldsWrapper
      name={name}
      label={label}
      placeholder={placeholder}
      isValid={isValid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isLabelHidden={isLabelHidden}
      isDescriptionHidden={isDescriptionHidden}
      describedById={describedById}
      errorMessage={errorMessage}
      columnIndex={columnIndex}
    >
      <Input
        name={name}
        type={type}
        size={size}
        value={value}
        isValid={isValid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        isDisabled={isDisabled}
        ariaLabel={fieldAriaLabel}
        ariaDescribedBy={describedById}
        onBlur={onBlur}
        onChange={onChange}
        onIconClick={onIconClick}
        valueGetter={valueGetter}
        formatValue={formatValue}
        Icon={Icon}
        iconId={iconId}
        iconAriaLabel={iconAriaLabel}
        inputClassName={inputClassName}
      />
    </CommonFormFieldsWrapper>
  );
};
