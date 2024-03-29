import { useCallback } from 'react';
import { FieldValues, useController } from 'react-hook-form';

import { CheckboxValue } from '../../Fields/Checkbox/types';
import { CheckboxFormField } from '../../FormFields';
import { useFieldErrorMessage } from '../hooks';
import { CheckboxAdapterProps } from './types';

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

  const fieldErrorMessage = useFieldErrorMessage({
    error,
    formatError,
  });

  const fieldValue = value as CheckboxValue;

  const handleChange = useCallback(
    (value: CheckboxValue): void => {
      onFieldChange(value);

      if (onChange) {
        onChange(value);
      }
    },
    [onFieldChange, onChange],
  );

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
