import { FC } from 'react';

import { Dropdown } from '../../Fields/Dropdown';
import { CommonFormFieldsWrapper } from '../CommonFormFieldWrapper';
import { DropdownFormFieldProps } from './types';

export const DropdownFormField: FC<DropdownFormFieldProps> = ({
  name,
  size,
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
  isLabelHidden,
  isDescriptionHidden,
  ariaLabel,
  label,
  columnIndex,
}) => {
  const describedById = `${name}Description`;
  const fieldAriaLabel = isLabelHidden
    ? ariaLabel || (typeof label === 'string' ? label : undefined)
    : undefined;

  return (
    <CommonFormFieldsWrapper
      name={name}
      label={label}
      placeholder={placeholder}
      isValid={isValid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isLabelHidden={isLabelHidden}
      isDescriptionHidden={isDescriptionHidden}
      describedById={describedById}
      errorMessage={errorMessage}
      columnIndex={columnIndex}
    >
      <Dropdown
        name={name}
        size={size}
        value={value}
        items={items}
        customItems={customItems}
        isValid={isValid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isOpen={isOpen}
        hasMultiselect={hasMultiselect}
        ariaLabel={fieldAriaLabel}
        ariaDescribedBy={describedById}
        onBlur={onBlur}
        onChange={onChange}
        itemValueGetter={itemValueGetter}
        ariaLabelledBy={name}
      />
    </CommonFormFieldsWrapper>
  );
};
