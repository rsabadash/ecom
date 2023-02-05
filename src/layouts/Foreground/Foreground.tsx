import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { ForegroundProps } from './types';
import classes from './styles/index.module.css';

export const Foreground: FC<PropsWithChildren<ForegroundProps>> = ({
  children,
  placeholder,
  foregroundClassName,
}) => {
  return (
    <section className={clsx(classes.foreground, foregroundClassName)}>
      {children || (
        <div className={classes.foreground__placeholder}>{placeholder}</div>
      )}
    </section>
  );
};
