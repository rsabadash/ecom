import { InputFormValue, InputValue } from './types';

export const serializeValue = (value: undefined | null | InputValue): InputValue => {
    if (value === undefined || value === null) {
        return '';
    }

    return value;
};

export const commonFormatValue = (value: undefined | InputValue, type: 'text' | 'number'): InputFormValue => {
    let formattedValue: InputFormValue = value;

    if (value === '') {
        return undefined;
    }

    if (type === 'number' && value) {
        return  Number(value);
    }

    return formattedValue;
};