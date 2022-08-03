import { ReactNode } from 'react';

export type AccessibleLabelProps = {
    label: ReactNode;
    htmlFor: string;
    isReadOnly?: boolean;
    isRequired?: boolean;
    labelClassName?: string;
};