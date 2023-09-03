import { FC } from 'react';

import { Input } from '../../Fields/Input';
import { Tooltip } from '../../Tooltip';
import { InputWithTooltipFormFieldProps } from './types';

import classes from './styles/index.module.css';

export const InputWithTooltipFormField: FC<InputWithTooltipFormFieldProps> = ({
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
  onIconClick,
  valueGetter,
  formatValue,
  Icon,
  iconAriaLabel,
  inputClassName,
  ariaLabel,
  errorMessage,
  position,
}) => {
  const describedById = `${name}Description`;

  return (
    <Tooltip
      isChildrenFocusable
      content={errorMessage || placeholder}
      contentId={describedById}
      position={position}
      tooltipClassName={classes.inputTooltip}
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
        ariaLabel={ariaLabel}
        ariaDescribedBy={describedById}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        onIconClick={onIconClick}
        valueGetter={valueGetter}
        formatValue={formatValue}
        Icon={Icon}
        iconAriaLabel={iconAriaLabel}
        inputClassName={inputClassName}
      />
    </Tooltip>
  );
};
