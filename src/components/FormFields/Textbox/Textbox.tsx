import { FC } from 'react';
import { Textbox } from '../../Fields/Textbox';
import { TextboxFormFieldProps } from './types';
import { CommonFormFieldsWrapper } from '../CommonFormFieldWrapper';

export const TextboxFormField: FC<TextboxFormFieldProps> = ({
  name,
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
      <Textbox
        name={name}
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
