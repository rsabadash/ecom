import { FC } from 'react';
import { Dropdown } from '../../Fields/Dropdown';
import { DropdownFormFieldProps } from './types';
import { FieldLabel } from '../FieldLabel';
import { FieldDescription } from '../FieldDescription';
import classes from './styles/index.module.css';

const DropdownFormField: FC<DropdownFormFieldProps> = (
    {
        name,
        value,
        items,
        customItems,
        placeholder,
        isValid,
        isRequired,
        isDisabled,
        isOpen,
        hasMultiselect,
        onBlur,
        onChange,
        itemValueGetter,
        isReadOnly,
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
            <FieldLabel
                label={label}
                htmlFor={name}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
            />
            <Dropdown
                name={name}
                value={value}
                items={items}
                customItems={customItems}
                isValid={isValid}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
                isDisabled={isDisabled}
                isOpen={isOpen}
                hasMultiselect={hasMultiselect}
                ariaDescribedBy={describedById}
                onBlur={onBlur}
                onChange={onChange}
                itemValueGetter={itemValueGetter}
                ariaLabelledBy={name}
            />
            {!isDescriptionHidden && descriptionMessage && (
                <FieldDescription id={describedById} type={descriptionType} message={descriptionMessage} />
            )}
        </div>
    );
};

export { DropdownFormField };