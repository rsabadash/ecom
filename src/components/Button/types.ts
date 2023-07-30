import { KeyboardEvent, MouseEvent } from 'react';
import { LinkProps } from 'react-router-dom';

import { BUTTON_SIZE, BUTTON_TYPE, BUTTON_VARIANT } from './constants';

export type ButtonProps = {
  name?: string;
  type?: ValuesOfObject<typeof BUTTON_TYPE>;
  size?: ValuesOfObject<typeof BUTTON_SIZE>;
  variant?: ValuesOfObject<typeof BUTTON_VARIANT>;
  isDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  tabIndex?: number;
  className?: string;
};

export type ButtonLinkProps = LinkProps & Omit<ButtonProps, 'name' | 'type'>;
