import { FC, KeyboardEvent, MouseEvent } from 'react';
import clsx from 'clsx';

import { EventKeys } from '../../common/enums/events';
import { DEFAULT_BUTTON_SIZE } from './constants';
import { ButtonIconProps } from './types';

import classes from './styles/index.module.css';

export const ButtonIcon: FC<ButtonIconProps> = ({
  size = DEFAULT_BUTTON_SIZE,
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
  const handleButtonClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (isDisabled || !onClick) {
      return;
    }

    onClick(event);
  };

  const handleButtonKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (isDisabled || !onKeyDown) {
      return;
    }

    const key = event.key as EventKeys;

    if (key === EventKeys.Enter || key === EventKeys.Space) {
      event.preventDefault();
      onKeyDown(event);
    }
  };

  const currentTabIndex = isDisabled ? -1 : tabIndex || 0;

  const buttonClassNames = clsx(
    classes.button,
    classes.button_icon,
    className,
    classes[`button_${size}`],
  );

  return (
    <div
      role="button"
      onClick={handleButtonClick}
      onKeyDown={handleButtonKeyDown}
      aria-disabled={isDisabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={buttonClassNames}
      tabIndex={currentTabIndex}
    >
      {children}
    </div>
  );
};
