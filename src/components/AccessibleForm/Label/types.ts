import { ReactNode } from 'react';

export type AccessibleLabelProps = {
    label: ReactNode;
    htmlFor: string;
    required?: boolean;
};