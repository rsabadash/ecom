import { ReactNode } from 'react';

import { LabelProps } from '../../Label/types';

export type FieldLabelProps = Pick<LabelProps, 'size'> & {
  label: ReactNode;
  htmlFor: string;
  isValid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  fieldLabelClassName?: string;
};
