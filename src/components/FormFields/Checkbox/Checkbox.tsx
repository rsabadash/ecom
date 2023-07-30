import { FC } from 'react';

import { Checkbox } from '../../Fields/Checkbox';
import { useGridInlineStyles } from '../../GridRowBalancer';
import { FieldDescription } from '../FieldDescription';
import { FieldLabel } from '../FieldLabel';
import { CheckboxFormFieldProps } from './types';

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
  columnIndex,
}) => {
  const [row1, row2] = useGridInlineStyles(columnIndex);

  const descriptionType = errorMessage ? 'error' : undefined;
  const descriptionMessage = errorMessage ? errorMessage : placeholder;
  const describedById = `${name}Description`;

  return (
    <div
      className={
        columnIndex !== undefined ? classes.formFieldWrapper : undefined
      }
    >
      <div style={row1} />
      <div style={row2}>
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
            fieldLabelClassName={classes.checkboxLabel}
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
    </div>
  );
};
