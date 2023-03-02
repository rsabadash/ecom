import { FC, PropsWithChildren } from 'react';
import classes from './styles/index.module.css';

export const FormContent: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.formContent}>{children}</div>;
};
