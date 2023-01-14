import { FC } from 'react';
import { Input } from '../../Fields/Input';
import { InputFormFieldProps } from './types';
import { FieldLabel } from '../FieldLabel';
import { FieldDescription } from '../FieldDescription';
import classes from './styles/index.module.css';

const InputFormField: FC<InputFormFieldProps> = ({
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
}) => {
  const descriptionType = errorMessage ? 'error' : undefined;
  const descriptionMessage = errorMessage ? errorMessage : placeholder;
  const describedById = `${name}Description`;

  return (
    <div className={classes.formFieldWrapper}>
      <FieldLabel
        label={label}
        htmlFor={name}
        isValid={isValid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      />
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
      {!isDescriptionHidden && descriptionMessage && (
        <FieldDescription
          id={describedById}
          type={descriptionType}
          message={descriptionMessage}
        />
      )}
    </div>
  );
};

export { InputFormField };
