import { FC } from 'react';

import { useGridInlineStyles } from '../../GridRowBalancer';
import { FieldDescription } from '../FieldDescription';
import { FieldLabel } from '../FieldLabel';
import { CommonFormFieldWrapperProps } from './types';

import classes from './styles/index.module.css';

export const CommonFormFieldsWrapper: FC<CommonFormFieldWrapperProps> = ({
  name,
  size,
  label,
  placeholder,
  children,
  isValid,
  isReadOnly,
  isRequired,
  isLabelHidden,
  isDescriptionHidden,
  describedById,
  errorMessage,
  columnIndex,
  row2ClassName,
}) => {
  const [row1, row2, row3] = useGridInlineStyles(columnIndex);

  const descriptionType = errorMessage ? 'error' : undefined;
  const descriptionMessage = errorMessage ? errorMessage : placeholder;

  return (
    <div
      className={
        columnIndex !== undefined
          ? classes.formFieldWrapperWithColumnIndex
          : classes.formFieldWrapper
      }
    >
      {!isLabelHidden && (
        <div style={row1}>
          <FieldLabel
            size={size}
            label={label}
            htmlFor={name}
            isValid={isValid}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
          />
        </div>
      )}
      <div className={row2ClassName} style={row2}>
        {children}
      </div>
      {!isDescriptionHidden && descriptionMessage && (
        <div style={row3}>
          <FieldDescription
            id={describedById}
            type={descriptionType}
            message={descriptionMessage}
          />
        </div>
      )}
    </div>
  );
};
