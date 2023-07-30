import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import classes from './styles/index.module.css';

import { DEFAULT_FONT_SIZE, DEFAULT_LEVEL, LEVEL_TAG_MAP } from './constatns';
import { HeadingProps } from './types';

export const Heading: FC<PropsWithChildren<HeadingProps>> = ({
  id,
  level = DEFAULT_LEVEL,
  fontSize = DEFAULT_FONT_SIZE,
  classNameHeading,
  children,
}) => {
  const HeadingTag = LEVEL_TAG_MAP[level];

  return (
    <HeadingTag
      id={id}
      className={clsx(classes[`heading-${fontSize}`], classNameHeading)}
    >
      {children}
    </HeadingTag>
  );
};
