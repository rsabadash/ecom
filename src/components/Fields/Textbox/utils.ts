import { TextboxFormValue, TextboxValue } from './types';

export const serializeValue = (value: TextboxFormValue): TextboxValue => {
  if (value === undefined || value === null) {
    return '';
  }

  return value.toString();
};

export const commonFormatValue = (
  value: undefined | TextboxFormValue,
): TextboxFormValue => {
  const formattedValue: TextboxFormValue = value;

  if (value === '' || value === undefined) {
    return null;
  }

  return formattedValue;
};
