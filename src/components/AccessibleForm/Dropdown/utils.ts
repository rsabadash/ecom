import { GetReadOnlyValueArgs } from './types';

export const getReadOnlyValue = (args: GetReadOnlyValueArgs): string => {
    const { value, language } = args;

    if (Array.isArray(value)) {
        return  value.map((v) => getReadOnlyValue({ value: v, language })).join(', ');
    }

    if (value) {
        if (typeof value === 'string') {
            return value;
        }

        if ('value' in value) {
            return value.value;
        }

        return value[language];
    }

    return '';
};