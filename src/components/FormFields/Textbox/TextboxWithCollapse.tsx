import { FC } from 'react';
import clsx from 'clsx';
import { Textbox } from '../../Fields/Textbox';
import { TextboxWithCollapseFormFieldProps } from './types';
import { CommonFormFieldsWrapper } from '../CommonFormFieldWrapper';
import { CollapseBuilderButton, CollapseController } from '../../Collapse';
import classes from './styles/index.module.css';

export const TextboxWithCollapseFormField: FC<
  TextboxWithCollapseFormFieldProps
> = ({
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
  ariaLabel,
  ariaControls,
  forceExpand,
  isToggleHidden,
  isInitiallyExpand,
  collapseBodyRef,
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
      <CollapseController
        ariaLabel={ariaLabel}
        ariaControls={ariaControls}
        forceExpand={forceExpand}
        isInitiallyExpand={isInitiallyExpand}
        collapseBodyRef={collapseBodyRef}
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
        {!isToggleHidden && (
          <CollapseBuilderButton
            collapseButtonClassName={collapseButtonClassName}
          />
        )}
      </CollapseController>
    </CommonFormFieldsWrapper>
  );
};