import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as PlusIcon } from '../../assets/icons/Plus.svg';
import { Foreground } from '../Foreground';
import { EmptyListProps } from './types';

import classes from './styles/index.module.css';

export const EmptyList: FC<EmptyListProps> = ({ link, children }) => {
  return (
    <Link to={link} className={classes.emptyListContent__link}>
      <Foreground foregroundClassName={classes.emptyListContent}>
        {children}
        <PlusIcon width="2em" height="2em" />
      </Foreground>
    </Link>
  );
};
