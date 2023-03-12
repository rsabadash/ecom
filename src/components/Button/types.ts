import { MouseEvent } from 'react';
import { LinkProps } from 'react-router-dom';
import { buttonSize, buttonType, buttonVariant } from './constants';

export type ButtonProps = {
  type?: ValuesOfObject<typeof buttonType>;
  size?: ValuesOfObject<typeof buttonSize>;
  variant?: ValuesOfObject<typeof buttonVariant>;
  isDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  tabIndex?: number;
  className?: string;
};

export type ButtonLinkProps = LinkProps & Omit<ButtonProps, 'type'>;
