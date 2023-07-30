import { FC, KeyboardEvent, MouseEvent, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { EventKeys } from '../../common/enums/events';
import { DEFAULT_BUTTON_SIZE, DEFAULT_BUTTON_VARIANT } from './constants';
import { ButtonLinkProps } from './types';

import classes from './styles/index.module.css';

export const ButtonLink: FC<PropsWithChildren<ButtonLinkProps>> = ({
  size = DEFAULT_BUTTON_SIZE,
  variant = DEFAULT_BUTTON_VARIANT,
  isDisabled,
  onClick,
  onKeyDown,
  children,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  className,
  ...linkProps
}) => {
  const handleButtonClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    onClick && onClick(event);
  };

  const handleButtonKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
  ): void => {
    if (isDisabled || !onKeyDown) {
      return;
    }

    const key = event.key as EventKeys;

    if (key === EventKeys.Enter || key === EventKeys.Space) {
      event.preventDefault();
      onKeyDown(event);
    }
  };

  return (
    <Link
      role="button"
      onClick={handleButtonClick}
      onKeyDown={handleButtonKeyDown}
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
