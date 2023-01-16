import { FC, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { TextboxProps } from './types';
import classes from './styles/index.module.css';

const Textbox: FC<TextboxProps> = ({
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
}) => {
  const textBoxRef = useRef<HTMLTextAreaElement>(null);

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
        readOnly={isReadOnly}
        required={isRequired}
        disabled={isDisabled}
        placeholder={isReadOnly ? '' : placeholder}
        aria-required={isRequired} // could be avoidable, but in this case used, cause React doesn't show require attribute and voice doesn't announce that field is isRequired
        aria-invalid={!isValid} // if value invalid
        aria-label={ariaLabel} // if other description absent
        aria-labelledby={ariaLabelledBy} // which element has a label for an input
        aria-describedby={ariaDescribedBy || placeholder} // which element describe input
        onBlur={onBlur}
        onChange={onChange}
        className={textboxClassName}
        tabIndex={isReadOnly ? -1 : 0}
        value={value || ''}
      />
    </div>
  );
};

export { Textbox };
