import { GetReadOnlyValueArgs } from './types';

export const getReadOnlyValue = (args: GetReadOnlyValueArgs): string => {
    const { value, language } = args;

    if (value === undefined || value === null) {
        return '';
    }

    if (typeof value !== 'object') {
        return value;
    } else {
        return value[language];
    }
};