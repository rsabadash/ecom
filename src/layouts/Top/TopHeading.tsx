import { FC, PropsWithChildren } from 'react';

import classes from './styles/index.module.css';

import { Heading } from '../../components/Heading';
import { TopHeadingProps } from './types';

export const TopHeading: FC<PropsWithChildren<TopHeadingProps>> = ({
  id,
  children,
}) => {
  return (
    <Heading id={id} fontSize={3} classNameHeading={classes.top__heading}>
      {children}
    </Heading>
  );
};
