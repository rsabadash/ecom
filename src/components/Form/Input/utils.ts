import { InputValue } from './types';

export const serializeValue = (value: undefined | null | InputValue): InputValue => {
    if (value === undefined || value === null) {
        return '';
    }

    return value;
};