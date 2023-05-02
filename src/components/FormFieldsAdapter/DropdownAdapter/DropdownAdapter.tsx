import { FieldValues, useController } from 'react-hook-form';
import { DropdownFormField } from '../../FormFields';
import { DropdownAdapterProps } from './types';
import { DropdownItem } from '../../Fields/Dropdown';
import { useFieldErrorMessage } from '../hooks';

export const DropdownAdapter = <FormValues extends FieldValues>({
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
  itemValueGetter,
  formatError,
  isLabelHidden,
  isDescriptionHidden,
  label,
  control,
  columnIndex,
}: DropdownAdapterProps<FormValues>) => {
  const {
    field: { onChange, onBlur, name: fieldName, value },
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

  return (
    <DropdownFormField
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
      onChange={onChange}
      itemValueGetter={itemValueGetter}
      errorMessage={fieldErrorMessage}
      isLabelHidden={isLabelHidden}
      isDescriptionHidden={isDescriptionHidden}
      label={label}
      columnIndex={columnIndex}
    />
  );
};
