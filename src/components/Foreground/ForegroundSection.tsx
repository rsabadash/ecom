import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { ForegroundSectionProps } from './types';
import classes from './styles/index.module.css';

export const ForegroundSection: FC<
  PropsWithChildren<ForegroundSectionProps>
> = ({ children, placeholder }) => {
  return (
    <section className={clsx(classes.foreground, classes.foregroundSection)}>
      {children || (
        <div className={classes.foregroundSection__placeholder}>
          {placeholder}
        </div>
      )}
    </section>
  );
};
