import { FC, PropsWithChildren } from 'react';
import classes from './styles/index.module.css';

export const ButtonsGroup: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.buttonsGroup}>{children}</div>;
};
