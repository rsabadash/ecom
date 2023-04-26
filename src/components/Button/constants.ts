export const buttonVariant = {
  regular: 'regular',
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  theme: 'theme',
} as const;

export const buttonSize = {
  s: 's',
  m: 'm',
  l: 'l',
  xl: 'xl',
} as const;

export const buttonType = {
  button: 'button',
  submit: 'submit',
} as const;

export const DEFAULT_BUTTON_VARIANT = buttonVariant.regular;
export const DEFAULT_BUTTON_SIZE = buttonSize.m;
export const DEFAULT_BUTTON_TYPE = buttonType.button;
