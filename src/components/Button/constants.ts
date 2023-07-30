export const BUTTON_VARIANT = {
  REGULAR: 'regular',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  THEME: 'theme',
} as const;

export const BUTTON_SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
  XL: 'xl',
} as const;

export const BUTTON_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
} as const;

export const DEFAULT_BUTTON_VARIANT = BUTTON_VARIANT.REGULAR;
export const DEFAULT_BUTTON_SIZE = BUTTON_SIZE.M;
export const DEFAULT_BUTTON_TYPE = BUTTON_TYPE.BUTTON;
