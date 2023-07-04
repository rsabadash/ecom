import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import classes from './styles/index.module.css';

import { LabelProps } from './types';

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
