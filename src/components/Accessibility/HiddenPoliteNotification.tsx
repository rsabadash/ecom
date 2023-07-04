import { FC, PropsWithChildren } from 'react';

import classes from './styles/index.module.css';

import { HiddenPoliteNotificationProps } from './types';

export const HiddenPoliteNotification: FC<
  PropsWithChildren<HiddenPoliteNotificationProps>
> = ({ id, children }) => {
  return (
    <p className={classes.hiddenScreenReaderElement} id={id} aria-live="polite">
      {children}
    </p>
  );
};
