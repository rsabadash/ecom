import { FC } from 'react';
import { Checkbox } from '../../Fields/Checkbox';
import { CheckboxFormFieldProps } from './types';
import { FieldLabel } from '../FieldLabel';
import { FieldDescription } from '../FieldDescription';
import classes from './styles/index.module.css';

export const CheckboxFormField: FC<CheckboxFormFieldProps> = ({
  name,
  isChecked,
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
      <div className={classes.checkboxLabelWrapper}>
        <Checkbox
          name={name}
          isChecked={isChecked}
          isValid={isValid}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          isDisabled={isDisabled}
          ariaDescribedBy={describedById}
          onBlur={onBlur}
          onChange={onChange}
        />
        <FieldLabel
          label={label}
          htmlFor={name}
          isValid={isValid}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
        />
      </div>
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
