import { FC, PropsWithChildren } from 'react';
import classes from './slyles/index.module.css';

export const EmptyPageContent: FC<PropsWithChildren> = ({ children }) => {
  return <section className={classes.emptyPageContent}>{children}</section>;
};
