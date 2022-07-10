import { forwardRef } from 'react';
import clsx from 'clsx';
import { InputProps } from './types';
import { serializeValue } from './utils';
import { DEFAULT_INPUT_TYPE } from './constants';
import classes from './styles/index.module.css';

const Input = forwardRef<HTMLInputElement, InputProps>((
    {
        id,
        name,
        type = DEFAULT_INPUT_TYPE,
        value,
        placeholder,
        invalid,
        isReadOnly,
        isRequired,
        isDisabled,
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
        onBlur,
        onChange,
        valueGetter
    },
    ref
) => {
    const currentValue = valueGetter ? valueGetter(value) : serializeValue(value);

    const inputClassName = clsx(
        classes.input,
        {
            [classes.input_readOnly]: isReadOnly
        }
    );

    return (
        <input
            ref={ref}
            id={id || name}
            name={name}
            type={type}
            value={currentValue}
            readOnly={isReadOnly}
            required={isRequired}
            disabled={isDisabled}
            placeholder={isReadOnly ? '' : placeholder}
            onBlur={onBlur}
            onChange={onChange}
            aria-required={isRequired} // could be avoidable, but in this case used, cause React doesn't show require attribute and voice doesn't announce that field is isRequired
            aria-invalid={invalid} // if value invalid
            aria-label={ariaLabel} // if other description absent
            aria-labelledby={ariaLabelledBy} // which element has a label for an input
            aria-describedby={ariaDescribedBy || placeholder} // which element describe input
            autoComplete="off"
            className={inputClassName}
            tabIndex={isReadOnly ? -1 : 0}
        />
    );
});

Input.displayName = 'Input';

export default Input;