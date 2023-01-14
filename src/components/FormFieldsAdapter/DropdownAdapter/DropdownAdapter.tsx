import { FieldValues, useController } from 'react-hook-form';
import { DropdownAdapterProps } from './types';
import { DropdownFormField } from '../../FormFields';
import { DropdownItem } from '../../Fields/Dropdown';
import { useTranslation } from '../../IntlProvider';

const DropdownAdapter = <FormValues extends FieldValues>({
  name,
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
  isDescriptionHidden,
  label,
  control,
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

  const { translate } = useTranslation();

  const fieldValues = value as DropdownItem;
  const fieldErrorMessage =
    error && formatError
      ? formatError(error)
      : error?.message && translate(error.message);

  return (
    <DropdownFormField
      name={fieldName}
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
      isDescriptionHidden={isDescriptionHidden}
      label={label}
    />
  );
};

export { DropdownAdapter };
