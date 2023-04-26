import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from '../../IntlProvider';
import { DropdownWitTooltipFormField } from '../../FormFields';
import { DropdownWithTooltipAdapterProps } from './types';
import { DropdownItem } from '../../Fields/Dropdown';

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
  itemValueGetter,
  formatError,
  ariaLabel,
  position,
  control,
}: DropdownWithTooltipAdapterProps<FormValues>) => {
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

  const { translate } = useTranslation();

  const fieldValues = value as DropdownItem;
  const fieldErrorMessage =
    error && formatError
      ? formatError(error)
      : error?.message && translate(error.message);

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
      onChange={onChange}
      itemValueGetter={itemValueGetter}
      errorMessage={fieldErrorMessage}
      ariaLabel={ariaLabel}
      position={position}
    />
  );
};
