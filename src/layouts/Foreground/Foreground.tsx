import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import classes from './styles/index.module.css';

import { ForegroundProps } from './types';

export const Foreground: FC<PropsWithChildren<ForegroundProps>> = ({
  children,
  foregroundClassName,
}) => {
  return (
    <div className={clsx(classes.foreground, foregroundClassName)}>
      {children}
    </div>
  );
};
