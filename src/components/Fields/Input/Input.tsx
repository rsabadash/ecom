import { ChangeEvent, FC, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { InputProps } from './types';
import { commonFormatValue, serializeValue } from './utils';
import { DEFAULT_INPUT_TYPE } from './constants';
import { EventKeys } from '../../../common/enums/events';
import classes from './styles/index.module.css';

export const Input: FC<InputProps> = ({
  id,
  name,
  type = DEFAULT_INPUT_TYPE,
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
  onChange,
  onIconClick,
  valueGetter,
  formatValue,
  Icon,
  iconAriaLabel,
  inputClassName,
}) => {
  const currentValue = valueGetter ? valueGetter(value) : serializeValue(value);
  const isIconFocusable = onIconClick && !isReadOnly && !isDisabled;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange && !isDisabled) {
      const value = e.target.value;
      const formattedValue = formatValue
        ? formatValue(value)
        : commonFormatValue(value, type);

      onChange(formattedValue);
    }
  };

  const handleOnIconClick = (): void => {
    if (isIconFocusable) {
      onIconClick();
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
      [classes.input_readOnly]: isReadOnly,
      [classes.input_invalid]: !isValid,
      [classes.input_withIcon]: Icon,
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
        onBlur={onBlur}
        onChange={handleOnChange}
        aria-required={isRequired} // could be avoidable, but in this case used, cause React doesn't show require attribute and voice doesn't announce that field is isRequired
        aria-invalid={!isValid} // if value invalid
        aria-label={ariaLabel} // if other description absent
        aria-labelledby={ariaLabelledBy} // which element has a label for an input
        aria-describedby={ariaDescribedBy || placeholder} // which element describe input
        autoComplete="off"
        className={inputClassNames}
        tabIndex={isReadOnly ? -1 : 0}
      />
      {Icon && (
        <Icon
          width="1.2em"
          height="1.2em"
          className={
            isIconFocusable
              ? classes.input__iconInteractive
              : classes.input__icon
          }
          onClick={handleOnIconClick}
          onKeyDown={handleOnIconKeyDown}
          tabIndex={isIconFocusable ? 0 : -1}
          role={isIconFocusable && 'button'}
          title={iconAriaLabel}
          aria-lable={iconAriaLabel}
        />
      )}
    </div>
  );
};
