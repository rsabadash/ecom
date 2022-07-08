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
        isRequired,
        isDisabled,
        onBlur,
        onChange,
        valueGetter,
        isReadOnly,
        label
    },
    ref
) => {
    const { language } = useTranslation();
    const readOnlyValue = isReadOnly ? getReadOnlyValue({ value, language }) : '';

    return (
        <div>
            <AccessibleLabel
                label={label}
                htmlFor={name}
                isRequired={isRequired}
                isReadOnly={isReadOnly}
            />
            {isReadOnly
                ? <ReadOnlyField value={readOnlyValue} />
                : <Input
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    isRequired={isRequired}
                    isDisabled={isDisabled}
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