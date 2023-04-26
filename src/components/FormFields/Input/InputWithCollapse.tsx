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
  size,
  value,
  placeholder,
  isValid,
  isReadOnly,
  isRequired,
  isDisabled,
  onBlur,
  onFocus,
  onChange,
  valueGetter,
  formatValue,
  errorMessage,
  isLabelHidden,
  isDescriptionHidden,
  ariaLabel,
  label,
  columnIndex,
  isToggleHidden,
}) => {
  const describedById = `${name}Description`;
  const fieldAriaLabel = isLabelHidden
    ? ariaLabel || (typeof label === 'string' ? label : undefined)
    : undefined;

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
      isLabelHidden={isLabelHidden}
      isDescriptionHidden={isDescriptionHidden}
      describedById={describedById}
      errorMessage={errorMessage}
      columnIndex={columnIndex}
      row2ClassName={classes.fieldWithCollapse}
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
        onFocus={onFocus}
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
