import { FC, KeyboardEvent, MouseEvent, PropsWithChildren } from 'react';
import clsx from 'clsx';
import {
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_TYPE,
  DEFAULT_BUTTON_VARIANT,
} from './constants';
import { ButtonProps } from './types';
import { EventKeys } from '../../common/enums/events';
import classes from './styles/index.module.css';

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  name,
  type = DEFAULT_BUTTON_TYPE,
  size = DEFAULT_BUTTON_SIZE,
  variant = DEFAULT_BUTTON_VARIANT,
  isDisabled,
  onClick,
  onKeyDown,
  children,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  tabIndex,
  className,
}) => {
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if (isDisabled || !onClick) {
      return;
    }

    onClick(event);
  };

  const handleButtonKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
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

  const buttonClassNames = clsx(
    classes.button,
    className,
    classes[`button_${size}`],
    classes[`button_${variant}`],
  );

  return (
    <button
      name={name}
      type={type}
      disabled={isDisabled}
      onClick={handleButtonClick}
      onKeyDown={handleButtonKeyDown}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={buttonClassNames}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
};
