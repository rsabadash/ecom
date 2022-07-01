import { ChangeEventHandler, FocusEventHandler } from 'react';

export type InputValue = string;

export type InputProps = {
    id?: string;
    name: string;
    type?: 'text';
    value?: null | InputValue;
    placeholder?: string;
    invalid?: boolean;
    required?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
    onBlur?: FocusEventHandler;
    onChange?: ChangeEventHandler;
    valueGetter?: (value: any) => InputValue;
};