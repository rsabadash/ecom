export const isNull = (value: unknown): boolean => value === null;

export const isUndefined = (value: unknown): boolean => typeof value === 'undefined';

export const isNullOrUndefined = (value: unknown): boolean => isNull(value) || isUndefined(value);

export const isFunction = (value: unknown): boolean => typeof value === 'function';

export const isBoolean = (value: unknown): boolean => typeof value === 'boolean';
