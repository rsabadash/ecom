import { FC, PropsWithChildren } from 'react';
import classes from './styles/index.module.css';

export const MainPublic: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.mainPublicWrapper}>
      <main className={classes.mainPublic}>{children}</main>
    </div>
  );
};
