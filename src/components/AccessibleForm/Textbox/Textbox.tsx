import { FC } from 'react';
import Textbox from '../../Form/Textbox';
import { AccessibleTextboxProps } from './types';
import AccessibleLabel from '../Label';
import Description from '../Description';
import classes from './styles/index.module.css';

const AccessibleTextbox: FC<AccessibleTextboxProps> = (
    {
        name,
        value,
        placeholder,
        isValid,
        isReadOnly,
        isRequired,
        isDisabled,
        onBlur,
        onChange,
        errorMessage,
        isDescriptionHidden,
        label
    }
) => {
    const descriptionType = errorMessage ? 'error' : undefined;
    const descriptionMessage = errorMessage ? errorMessage : placeholder;
    const describedById = `${name}Description`;

    return (
        <div className={classes.accessibleFieldWrapper}>
            <AccessibleLabel
                label={label}
                htmlFor={name}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
            />
            <Textbox
                name={name}
                value={value}
                isValid={isValid}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
                isDisabled={isDisabled}
                ariaDescribedBy={describedById}
                onBlur={onBlur}
                onChange={onChange}
            />
            {!isDescriptionHidden && descriptionMessage && (
                <Description id={describedById} type={descriptionType} message={descriptionMessage} />
            )}
        </div>
    );
};

export default AccessibleTextbox;