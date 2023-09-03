import { ChangeEvent, FC, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { TextboxProps } from './types';
import { commonFormatValue, serializeValue } from './utils';

import classes from './styles/index.module.css';

export const Textbox: FC<TextboxProps> = ({
  id,
  name,
  value,
  placeholder,
  isValid = true,
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
}) => {
  const currentValue = valueGetter ? valueGetter(value) : serializeValue(value);

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (onChange) {
      const value = e.target.value;
      const formattedValue = formatValue
        ? formatValue(value)
        : commonFormatValue(value);

      onChange(formattedValue);
    }
  };

  const textBoxRef = useRef<null | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textBoxRef.current) {
      const height = textBoxRef.current.offsetHeight;

      if (height < textBoxRef.current.scrollHeight) {
        textBoxRef.current.style.height = `${textBoxRef.current.scrollHeight}px`;
      }
    }
  }, []);

  const textboxWrapperClassName = clsx(classes.textboxWrapper, {
    [classes.textboxWrapper_readOnly]: isReadOnly,
    [classes.textboxWrapper_invalid]: !isValid,
  });

  const textboxClassName = clsx(classes.textbox, {
    [classes.textbox_readOnly]: isReadOnly,
  });

  return (
    <div className={textboxWrapperClassName}>
      <textarea
        ref={textBoxRef}
        id={id || name}
        name={name}
        value={currentValue}
        readOnly={isReadOnly}
        required={isRequired}
        disabled={isDisabled}
        placeholder={isReadOnly ? '' : placeholder}
        aria-required={isRequired} // could be avoidable, but in this case used, cause React doesn't show require attribute and voice doesn't announce that field is isRequired
        aria-invalid={!isValid} // if value invalid
        aria-label={ariaLabel} //  if another description is absent
        aria-labelledby={ariaLabelledBy} // which element has a label for an input
        aria-describedby={ariaDescribedBy || placeholder} // which element describe input
        onBlur={onBlur}
        onChange={handleOnChange}
        className={textboxClassName}
        tabIndex={isReadOnly ? -1 : 0}
        rows={isReadOnly ? 1 : undefined}
      />
    </div>
  );
};
