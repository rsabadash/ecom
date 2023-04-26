import { FC, PropsWithChildren } from 'react';
import { HiddenPoliteNotificationProps } from './types';
import classes from './styles/index.module.css';

export const HiddenPoliteNotification: FC<
  PropsWithChildren<HiddenPoliteNotificationProps>
> = ({ id, children }) => {
  return (
    <p className={classes.hiddenScreenReaderElement} id={id} aria-live="polite">
      {children}
    </p>
  );
};
