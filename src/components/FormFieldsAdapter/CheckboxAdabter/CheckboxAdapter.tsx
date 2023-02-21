import { useCallback } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from '../../IntlProvider';
import { CheckboxFormField } from '../../FormFields';
import { CheckboxAdapterProps } from './types';
import { CheckboxValue } from '../../Fields/Checkbox/types';

export const CheckboxAdapter = <FormValues extends FieldValues>({
  name,
  placeholder,
  isReadOnly,
  isRequired,
  isDisabled,
  onChange,
  formatError,
  isDescriptionHidden,
  label,
  control,
  columnIndex,
}: CheckboxAdapterProps<FormValues>) => {
  const {
    field: { onChange: onFieldChange, onBlur, name: fieldName, value },
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    defaultValue: false,
  });

  const { translate } = useTranslation();

  const handleChange = useCallback(
    (value: CheckboxValue) => {
      onFieldChange(value);

      if (onChange) {
        onChange(value);
      }
    },
    [onFieldChange, onChange],
  );

  const fieldValue = value as CheckboxValue;
  const fieldErrorMessage =
    error && formatError
      ? formatError(error)
      : error?.message && translate(error.message);

  return (
    <CheckboxFormField
      name={fieldName}
      isChecked={fieldValue}
      placeholder={placeholder}
      isValid={!fieldErrorMessage}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isDisabled={isDisabled}
      onBlur={onBlur}
      onChange={handleChange}
      errorMessage={fieldErrorMessage}
      isDescriptionHidden={isDescriptionHidden}
      label={label}
      columnIndex={columnIndex}
    />
  );
};
