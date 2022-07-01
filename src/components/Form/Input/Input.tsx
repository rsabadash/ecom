import { forwardRef } from 'react';
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
        required,
        disabled,
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

    return (
        <input
            ref={ref}
            id={id || name}
            name={name}
            type={type}
            value={currentValue}
            disabled={disabled}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
            aria-required={required} // could be avoidable, but in this case used, cause React doesn't show require attribute and voice doesn't announce that field is required
            aria-invalid={invalid} // if value invalid
            aria-label={ariaLabel} // if other description absent
            aria-labelledby={ariaLabelledBy} // which element has a label for an input
            aria-describedby={ariaDescribedBy || placeholder} // which element describe input
            autoComplete="off"
            className={classes.input}
        />
    );
});

Input.displayName = 'Input';

export default Input;