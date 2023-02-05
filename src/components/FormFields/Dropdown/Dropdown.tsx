import { FC } from 'react';
import { Dropdown } from '../../Fields/Dropdown';
import { DropdownFormFieldProps } from './types';
import { CommonFormFieldsWrapper } from '../CommonFormFieldWrapper';

export const DropdownFormField: FC<DropdownFormFieldProps> = ({
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
  label,
  columnIndex,
}) => {
  const describedById = `${name}Description`;

  return (
    <CommonFormFieldsWrapper
      name={name}
      label={label}
      placeholder={placeholder}
      isValid={isValid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isDescriptionHidden={isDescriptionHidden}
      errorMessage={errorMessage}
      columnIndex={columnIndex}
    >
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
    </CommonFormFieldsWrapper>
  );
};
