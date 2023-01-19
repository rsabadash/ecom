import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { LabelProps } from './types';
import classes from './styles/index.module.css';

export const Label: FC<PropsWithChildren<LabelProps>> = ({
  labelId,
  htmlFor,
  labelClassName,
  children,
}) => {
  return (
    <label
      id={labelId} // for aria-labelledby
      htmlFor={htmlFor} // for input
      className={clsx(classes.label, labelClassName)}
    >
      {children}
    </label>
  );
};
