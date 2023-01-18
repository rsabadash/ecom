import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import {
  DEFAULT_BUTTON_VARIANT,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_TYPE,
} from './constants';
import { ButtonProps } from './types';
import classes from './styles/index.module.css';

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  type = DEFAULT_BUTTON_TYPE,
  size = DEFAULT_BUTTON_SIZE,
  variant = DEFAULT_BUTTON_VARIANT,
  isDisabled,
  onClick,
  children,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  className,
}) => {
  const handleButtonClick = (): void => {
    if (isDisabled) {
      return;
    }

    onClick && onClick();
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleButtonClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={clsx(
        classes.button,
        className,
        classes[`button_${size}`],
        classes[`button_${variant}`],
      )}
    >
      {children}
    </button>
  );
};
