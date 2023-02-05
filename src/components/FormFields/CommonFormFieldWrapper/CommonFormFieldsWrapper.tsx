import { FC, PropsWithChildren } from 'react';
import { useGridInlineStyles } from '../../GridRowBalancer';
import { FieldLabel } from '../FieldLabel';
import { FieldDescription } from '../FieldDescription';
import { CommonFormFieldWrapperProps } from './types';
import classes from './styles/index.module.css';

export const CommonFormFieldsWrapper: FC<
  PropsWithChildren<CommonFormFieldWrapperProps>
> = ({
  name,
  label,
  placeholder,
  children,
  isValid,
  isReadOnly,
  isRequired,
  isDescriptionHidden,
  errorMessage,
  columnIndex,
  row2ClassName,
}) => {
  const [row1, row2, row3] = useGridInlineStyles(columnIndex);

  const descriptionType = errorMessage ? 'error' : undefined;
  const descriptionMessage = errorMessage ? errorMessage : placeholder;
  const describedById = `${name}Description`;

  return (
    <div className={classes.formFieldWrapper}>
      <div style={row1}>
        <FieldLabel
          label={label}
          htmlFor={name}
          isValid={isValid}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
        />
      </div>
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