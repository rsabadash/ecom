import { FieldValues, useController } from 'react-hook-form';
import { TextboxWithCollapseAdapterProps } from './types';
import { TextboxWithCollapseFormField } from '../../FormFields';
import { TextboxValue } from '../../Fields/Textbox';
import { useTranslation } from '../../IntlProvider';

export const TextboxWithCollapseAdapter = <FormValues extends FieldValues>({
  name,
  placeholder,
  isReadOnly,
  isRequired,
  isDisabled,
  valueGetter,
  formatValue,
  formatError,
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

  const { translate } = useTranslation();

  const fieldValue = value as TextboxValue;
  const fieldErrorMessage =
    error && formatError
      ? formatError(error)
      : error?.message && translate(error.message);

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
      isDescriptionHidden={isDescriptionHidden}
      label={label}
      columnIndex={columnIndex}
      isToggleHidden={isToggleHidden}
    />
  );
};
