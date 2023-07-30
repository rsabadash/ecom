import { FC, PropsWithChildren } from 'react';

import classes from './styles/index.module.css';

export const TopButtons: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.top__buttons}>{children}</div>;
};
