import { KeyboardEvent, MouseEvent, PropsWithChildren } from 'react';
import { LinkProps } from 'react-router-dom';

import { ElementSize } from '../../common/types/size';
import { BUTTON_TYPE, BUTTON_VARIANT } from './constants';

export type ButtonProps = PropsWithChildren<{
  name?: string;
  type?: ValuesOfObject<typeof BUTTON_TYPE>;
  size?: ElementSize;
  variant?: ValuesOfObject<typeof BUTTON_VARIANT>;
  isDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  tabIndex?: number;
  className?: string;
}>;

export type ButtonLinkProps = PropsWithChildren<
  LinkProps & Omit<ButtonProps, 'name' | 'type'>
>;

export type ButtonIconProps = PropsWithChildren<
  Omit<ButtonProps, 'name' | 'type' | 'variant'> & {
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  }
>;
