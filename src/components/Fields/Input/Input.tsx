import { ChangeEvent, FC } from 'react';
import clsx from 'clsx';
import { InputProps } from './types';
import { commonFormatValue, serializeValue } from './utils';
import { DEFAULT_INPUT_TYPE } from './constants';
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
  valueGetter,
  formatValue,
  inputClassName,
}) => {
  const currentValue = valueGetter ? valueGetter(value) : serializeValue(value);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const value = e.target.value;
      const formattedValue = formatValue
        ? formatValue(value)
        : commonFormatValue(value, type);

      onChange(formattedValue);
    }
  };

  const inputClassNames = clsx(
    classes.input,
    {
      [classes.input_readOnly]: isReadOnly,
      [classes.input_invalid]: !isValid,
    },
    inputClassName,
  );

  return (
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
  );
};
