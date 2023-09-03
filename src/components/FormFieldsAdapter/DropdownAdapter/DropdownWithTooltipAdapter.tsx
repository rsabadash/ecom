import { FieldValues, useController } from 'react-hook-form';

import { DropdownItem, DropdownValue } from '../../Fields/Dropdown';
import { DropdownWitTooltipFormField } from '../../FormFields';
import { useFieldErrorMessage } from '../hooks';
import { DropdownWithTooltipAdapterProps } from './types';

export const DropdownWithTooltipAdapter = <FormValues extends FieldValues>({
  name,
  size,
  items,
  customItems,
  placeholder,
  isReadOnly,
  isRequired,
  isDisabled,
  isOpen,
  hasMultiselect,
  onChange,
  itemValueGetter,
  formatError,
  ariaLabel,
  position,
  control,
}: DropdownWithTooltipAdapterProps<FormValues>) => {
  const {
    field: { onChange: onChangeField, onBlur, name: fieldName, value },
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    defaultValue: hasMultiselect ? [] : null,
  });

  const fieldErrorMessage = useFieldErrorMessage({
    error,
    formatError,
  });

  const fieldValues = value as DropdownItem;

  const handleOnChange = (value: DropdownValue, isSelected: boolean): void => {
    onChange && onChange(value, isSelected);
    onChangeField(value);
  };

  return (
    <DropdownWitTooltipFormField
      name={fieldName}
      size={size}
      value={fieldValues}
      items={items}
      customItems={customItems}
      placeholder={placeholder}
      isValid={!fieldErrorMessage}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isOpen={isOpen}
      hasMultiselect={hasMultiselect}
      onBlur={onBlur}
      onChange={handleOnChange}
      itemValueGetter={itemValueGetter}
      errorMessage={fieldErrorMessage}
      ariaLabel={ariaLabel}
      position={position}
    />
  );
};
