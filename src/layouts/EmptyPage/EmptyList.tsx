import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { Foreground } from '../Foreground';
import { ReactComponent as PlusIcon } from '../../assets/icons/Plus.svg';
import { EmptyListProps } from './types';
import classes from './styles/index.module.css';

export const EmptyList: FC<PropsWithChildren<EmptyListProps>> = ({
  link,
  children,
}) => {
  return (
    <Link to={link} className={classes.emptyListContent__link}>
      <Foreground foregroundClassName={classes.emptyListContent}>
        {children}
        <PlusIcon width="2em" height="2em" />
      </Foreground>
    </Link>
  );
};
