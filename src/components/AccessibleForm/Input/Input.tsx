import { FC } from 'react';
import Input from '../../Form/Input';
import { AccessibleInputProps } from './types';
import AccessibleLabel from '../Label';
import Description from '../Description';
import classes from './styles/index.module.css';

const AccessibleInput: FC<AccessibleInputProps> = (
    {
        name,
        type,
        value,
        placeholder,
        isValid,
        isReadOnly,
        isRequired,
        isDisabled,
        onBlur,
        onChange,
        valueGetter,
        formatValue,
        errorMessage,
        isDescriptionHidden,
        label
    }
) => {
    const descriptionType = errorMessage ? 'error' : undefined;
    const descriptionMessage = errorMessage ? errorMessage : placeholder;

    return (
        <div className={classes.accessibleFieldWrapper}>
            <AccessibleLabel
                label={label}
                htmlFor={name}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
            />
            <Input
                name={name}
                type={type}
                value={value}
                isValid={isValid}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
                isDisabled={isDisabled}
                onBlur={onBlur}
                onChange={onChange}
                valueGetter={valueGetter}
                formatValue={formatValue}
            />
            {!isDescriptionHidden && descriptionMessage && (
                <Description type={descriptionType} message={descriptionMessage} />
            )}
        </div>
    );
};

export default AccessibleInput;