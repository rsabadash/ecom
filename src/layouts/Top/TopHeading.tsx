import { FC } from 'react';

import { Heading } from '../../components/Heading';
import { TopHeadingProps } from './types';

import classes from './styles/index.module.css';

export const TopHeading: FC<TopHeadingProps> = ({ id, children }) => {
  return (
    <Heading id={id} fontSize={3} classNameHeading={classes.top__heading}>
      {children}
    </Heading>
  );
};
