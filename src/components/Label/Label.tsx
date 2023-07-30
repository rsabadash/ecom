import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import { DEFAULT_LABEL_SIZE } from './constants';
import { LabelProps } from './types';

import classes from './styles/index.module.css';

export const Label: FC<PropsWithChildren<LabelProps>> = ({
  size = DEFAULT_LABEL_SIZE,
  labelId,
  htmlFor,
  labelClassName,
  children,
}) => {
  const labelClassNames = clsx(
    classes.label,
    {
      [classes[`label_${size}`]]: size,
    },
    labelClassName,
  );

  return (
    <label
      id={labelId} // for aria-labelledby
      htmlFor={htmlFor} // for input
      className={labelClassNames}
    >
      {children}
    </label>
  );
};
