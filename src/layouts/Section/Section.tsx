import { FC, PropsWithChildren } from 'react';

import classes from './styles/index.module.css';

export const Section: FC<PropsWithChildren> = ({ children }) => {
  return <section className={classes.section}>{children}</section>;
};
