import { ReactNode } from 'react';

export type AccessibleLabelProps = {
    label: ReactNode;
    htmlFor: string;
    isRequired?: boolean;
    isReadOnly?: boolean;
};