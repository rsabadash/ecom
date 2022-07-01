import { forwardRef } from 'react';
import Input  from '../../Form/Input';
import { AccessibleInputProps } from './types';
import AccessibleLabel from '../Label';
import ReadOnlyField from '../ReadOnlyField';
import { useTranslation } from '../../IntlProvider';
import { getReadOnlyValue } from './utils';

const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>((
    {
        name,
        type,
        value,
        placeholder,
        required,
        disabled,
        onBlur,
        onChange,
        valueGetter,
        readOnly,
        label
    },
    ref
) => {
    const { language } = useTranslation();
    const readOnlyValue = readOnly ? getReadOnlyValue({ value, language }) : '';

    return (
        <div>
            <AccessibleLabel
                label={label}
                htmlFor={name}
                required={required}
                readOnly={readOnly}
            />
            {readOnly
                ? <ReadOnlyField value={readOnlyValue} />
                : <Input
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    onBlur={onBlur}
                    onChange={onChange}
                    valueGetter={valueGetter}
                    ref={ref}
                />
            }
        </div>
    );
});

AccessibleInput.displayName = 'AccessibleInput';

export default AccessibleInput;