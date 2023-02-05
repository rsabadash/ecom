import { FC } from 'react';
import { Input } from '../../Fields/Input';
import { InputFormFieldProps } from './types';
import { CommonFormFieldsWrapper } from '../CommonFormFieldWrapper';

export const InputFormField: FC<InputFormFieldProps> = ({
  name,
  type,
  value,
  placeholder,
  isValid,
  isReadOnly,
  isRequired,
  isDisabled,
  onBlur,
  onChange,
  valueGetter,
  formatValue,
  errorMessage,
  isDescriptionHidden,
  label,
  columnIndex,
}) => {
  const describedById = `${name}Description`;

  return (
    <CommonFormFieldsWrapper
      name={name}
      label={label}
      placeholder={placeholder}
      isValid={isValid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isDescriptionHidden={isDescriptionHidden}
      errorMessage={errorMessage}
      columnIndex={columnIndex}
    >
      <Input
        name={name}
        type={type}
        value={value}
        isValid={isValid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        isDisabled={isDisabled}
        ariaDescribedBy={describedById}
        onBlur={onBlur}
        onChange={onChange}
        valueGetter={valueGetter}
        formatValue={formatValue}
      />
    </CommonFormFieldsWrapper>
  );
};
