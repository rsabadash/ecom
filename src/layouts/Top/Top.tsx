import { FC, PropsWithChildren } from 'react';
import classes from './styles/index.module.css';

export const Top: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.top}>{children}</div>;
};
