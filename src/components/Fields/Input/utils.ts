import { InputFormValue, InputType, InputValue } from './types';

export const serializeValue = (
  value: undefined | null | InputFormValue,
): InputValue => {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value);
};

export const commonFormatValue = (
  value: undefined | InputValue,
  type: InputType,
): InputFormValue => {
  const formattedValue: InputFormValue = value;

  if (value === '') {
    return null;
  }

  if (type === 'number' && value) {
    return Number(value);
  }

  return formattedValue;
};
