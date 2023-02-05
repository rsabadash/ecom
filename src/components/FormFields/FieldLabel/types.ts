import { ReactNode } from 'react';

export type FieldLabelProps = {
  label: ReactNode;
  htmlFor: string;
  isValid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  fieldLabelClassName?: string;
};
