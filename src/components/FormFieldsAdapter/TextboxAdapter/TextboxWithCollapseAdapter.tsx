import { FieldValues, useController } from 'react-hook-form';

import { TextboxValue } from '../../Fields/Textbox';
import { TextboxWithCollapseFormField } from '../../FormFields';
import { useFieldErrorMessage } from '../hooks';
import { TextboxWithCollapseAdapterProps } from './types';

export const TextboxWithCollapseAdapter = <FormValues extends FieldValues>({
  name,
  placeholder,
  isReadOnly,
  isRequired,
  isDisabled,
  valueGetter,
  formatValue,
  formatError,
  isLabelHidden,
  isDescriptionHidden,
  label,
  control,
  columnIndex,
  isToggleHidden,
}: TextboxWithCollapseAdapterProps<FormValues>) => {
  const {
    field: { onChange, onBlur, name: fieldName, value },
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    defaultValue: null,
  });

  const fieldErrorMessage = useFieldErrorMessage({
    error,
    formatError,
  });

  const fieldValue = value as TextboxValue;

  return (
    <TextboxWithCollapseFormField
      name={fieldName}
      value={fieldValue}
      placeholder={placeholder}
      isValid={!fieldErrorMessage}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isDisabled={isDisabled}
      onBlur={onBlur}
      onChange={onChange}
      valueGetter={valueGetter}
      formatValue={formatValue}
      errorMessage={fieldErrorMessage}
      isLabelHidden={isLabelHidden}
      isDescriptionHidden={isDescriptionHidden}
      label={label}
      columnIndex={columnIndex}
      isToggleHidden={isToggleHidden}
    />
  );
};
