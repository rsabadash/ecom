import { FC, PropsWithChildren } from 'react';
import classes from './styles/index.module.css';

export const FormDescription: FC<PropsWithChildren> = ({ children }) => {
  return <p className={classes.formDescription}>{children}</p>;
};
