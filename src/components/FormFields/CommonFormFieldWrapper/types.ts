import { PropsWithChildren } from 'react';

import { FieldLabelProps } from '../FieldLabel';

export type CommonFormFieldWrapperProps = PropsWithChildren<
  Pick<FieldLabelProps, 'label' | 'size'> & {
    name: string;
    placeholder?: string;
    isValid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isLabelHidden?: boolean;
    isDescriptionHidden?: boolean;
    describedById?: string;
    errorMessage?: string;
    columnIndex?: number;
    row2ClassName?: string;
  }
>;
