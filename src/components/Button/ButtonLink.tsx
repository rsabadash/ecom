import { FC, PropsWithChildren, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { DEFAULT_BUTTON_VARIANT, DEFAULT_BUTTON_SIZE } from './constants';
import { ButtonLinkProps } from './types';
import classes from './styles/index.module.css';

export const ButtonLink: FC<PropsWithChildren<ButtonLinkProps>> = ({
  size = DEFAULT_BUTTON_SIZE,
  variant = DEFAULT_BUTTON_VARIANT,
  isDisabled,
  onClick,
  children,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  className,
  ...linkProps
}) => {
  const handleButtonClick = (e: MouseEvent): void => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }

    onClick && onClick();
  };

  return (
    <Link
      role="button"
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
      {...linkProps}
    >
      {children}
    </Link>
  );
};
