import { FC } from 'react';

import { HiddenPoliteNotificationProps } from './types';

import classes from './styles/index.module.css';

export const HiddenPoliteNotification: FC<HiddenPoliteNotificationProps> = ({
  id,
  children,
}) => {
  return (
    <p className={classes.hiddenScreenReaderElement} id={id} aria-live="polite">
      {children}
    </p>
  );
};
