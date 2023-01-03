import { ReactNode } from 'react';

export type FieldLabelProps = {
    label: ReactNode;
    htmlFor: string;
    isReadOnly?: boolean;
    isRequired?: boolean;
    labelClassName?: string;
};