import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { TagProps } from './types';
import { DEFAULT_TAG_VARIANT } from './constants';
import classes from './styles/index.module.css';

export const Tag: FC<PropsWithChildren<TagProps>> = ({
  variant = DEFAULT_TAG_VARIANT,
  children,
}) => {
  const classNames = clsx(classes.tag, classes[`tag_${variant}`]);

  return <div className={classNames}>{children}</div>;
};
