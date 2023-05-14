export const URL_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const DECIMAL = /^\d{1,10}\.?\d{0,2}$/;

export const DECIMAL_POSITIVE = /^([1-9]{1,10})\.?\d{0,2}$/;

export const DECIMAL_ZERO_ENDS = /^\d{1,10}\.?(0{0,2})$/;

export const DECIMAL_ONLY_ZEROS = /^(0{1,10})\.?(0{0,2})$/;
