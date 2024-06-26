import { ChangeEvent, FC, KeyboardEvent } from 'react';
import clsx from 'clsx';

import { DEFAULT_ICON_SIZE } from '../../../common/constants/icons';
import { EventKeys } from '../../../common/enums/events';
import {
  DEFAULT_INPUT_SIZE,
  DEFAULT_INPUT_TYPE,
  INPUT_TYPE,
} from './constants';
import { InputProps } from './types';
import { commonFormatValue, serializeValue } from './utils';

import classes from './styles/index.module.css';

export const Input: FC<InputProps> = ({
  id,
  name,
  type = DEFAULT_INPUT_TYPE,
  size = DEFAULT_INPUT_SIZE,
  value,
  placeholder,
  isValid,
  isReadOnly,
  isRequired,
  isDisabled,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  onBlur,
  onFocus,
  onChange,
  onIconClick,
  valueGetter,
  formatValue,
  Icon,
  iconId,
  iconAriaLabel,
  inputClassName,
}) => {
  const currentValue = valueGetter ? valueGetter(value) : serializeValue(value);
  const isIconFocusable = onIconClick && !isReadOnly && !isDisabled;

  const handleOnBlur = (): void => {
    if (onBlur) {
      const formattedValue = formatValue
        ? formatValue(currentValue, currentValue)
        : commonFormatValue(currentValue, type);

      onBlur(formattedValue);
    }
  };

  const handleOnFocus = (): void => {
    if (onFocus) {
      const formattedValue = formatValue
        ? formatValue(currentValue, currentValue)
        : commonFormatValue(currentValue, type);

      onFocus(formattedValue);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange && !isDisabled) {
      const value = e.target.value;
      const formattedValue = formatValue
        ? formatValue(value, currentValue)
        : commonFormatValue(value, type);

      onChange(formattedValue);
    }
  };

  const handleOnIconClick = (): void => {
    if (isIconFocusable) {
      onIconClick();
    }
  };

  const handleOnKeydown = (event: KeyboardEvent): void => {
    if (type === INPUT_TYPE.NUMBER) {
      const key = event.key as EventKeys;

      if (key === EventKeys.ArrowUp || key === EventKeys.ArrowDown) {
        event.preventDefault();
      }
    }
  };

  const handleOnIconKeyDown = (event: KeyboardEvent): void => {
    if (isIconFocusable) {
      const key = event.key as EventKeys;

      if (key === EventKeys.Enter || key === EventKeys.Space) {
        onIconClick();
      }
    }
  };

  const inputClassNames = clsx(
    classes.input,
    {
      [classes.input_disabled]: isDisabled,
      [classes.input_readOnly]: isReadOnly,
      [classes.input_invalid]: !isValid,
      [classes.input_withIcon]: Icon,
      [classes[`input_${size}`]]: size,
    },
    inputClassName,
  );

  return (
    <div className={classes.inputWrapper}>
      <input
        id={id || name}
        name={name}
        type={type}
        value={currentValue}
        readOnly={isReadOnly}
        required={isRequired}
        disabled={isDisabled}
        placeholder={isReadOnly ? '' : placeholder}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onChange={handleOnChange}
        onKeyDown={handleOnKeydown}
        aria-required={isRequired} // could be avoidable, but in this case used, cause React doesn't show require attribute and voice doesn't announce that field is isRequired
        aria-invalid={!isValid} // if value invalid
        aria-label={ariaLabel} // if another description is absent
        aria-labelledby={ariaLabelledBy} // which element has a label for an input
        aria-describedby={ariaDescribedBy || placeholder} // which element describe input
        autoComplete="off"
        className={inputClassNames}
        tabIndex={isReadOnly ? -1 : 0}
      />
      {Icon && (
        <Icon
          id={iconId}
          width={DEFAULT_ICON_SIZE}
          height={DEFAULT_ICON_SIZE}
          className={
            isIconFocusable
              ? classes.input__iconInteractive
              : classes.input__icon
          }
          onClick={handleOnIconClick}
          onKeyDown={handleOnIconKeyDown}
          tabIndex={isIconFocusable ? 0 : -1}
          role={isIconFocusable ? 'button' : undefined}
          title={iconAriaLabel}
          aria-label={iconAriaLabel}
        />
      )}
    </div>
  );
};
