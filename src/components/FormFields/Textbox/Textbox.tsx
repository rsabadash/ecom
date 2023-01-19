import { FC } from 'react';
import { Textbox } from '../../Fields/Textbox';
import { TextboxFormFieldProps } from './types';
import { FieldLabel } from '../FieldLabel';
import { FieldDescription } from '../FieldDescription';
import classes from './styles/index.module.css';

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
