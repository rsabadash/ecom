import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from '../../IntlProvider';
import { TextboxFormField } from '../../FormFields';
import { TextboxAdapterProps } from './types';
import { TextboxValue } from '../../Fields/Textbox';

export const TextboxAdapter = <FormValues extends FieldValues>({
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
}: TextboxAdapterProps<FormValues>) => {
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
    <TextboxFormField
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
    />
  );
};
