import { FC } from 'react';
import clsx from 'clsx';

import { ForegroundProps } from './types';

import classes from './styles/index.module.css';

export const Foreground: FC<ForegroundProps> = ({
  children,
  foregroundClassName,
}) => {
  return (
    <div className={clsx(classes.foreground, foregroundClassName)}>
      {children}
    </div>
  );
};
