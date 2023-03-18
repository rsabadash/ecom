import { FC } from 'react';
import clsx from 'clsx';
import { Input } from '../../Fields/Input';
import { InputWithCollapseFormFieldProps } from './types';
import { CommonFormFieldsWrapper } from '../CommonFormFieldWrapper';
import { CollapseBuilderButton } from '../../Collapse';
import classes from './styles/index.module.css';

export const InputWithCollapseFormField: FC<
  InputWithCollapseFormFieldProps
> = ({
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
  isToggleHidden,
}) => {
  const describedById = `${name}Description`;

  const collapseButtonClassName = clsx({
    [classes.fieldWithCollapseButton]: isReadOnly,
  });

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
      row2ClassName={classes.fieldWithCollapse}
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
      {!isToggleHidden && (
        <CollapseBuilderButton
          collapseButtonClassName={collapseButtonClassName}
        />
      )}
    </CommonFormFieldsWrapper>
  );
};
