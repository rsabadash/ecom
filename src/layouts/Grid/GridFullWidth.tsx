import { FC, PropsWithChildren } from 'react';

import classes from './styles/index.module.css';

export const GridFullWidth: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.gridFullWidth}>{children}</div>;
};
