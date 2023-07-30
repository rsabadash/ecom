import { FC, PropsWithChildren } from 'react';

import classes from './styles/index.module.css';

import { Navigation } from '../../components/Navigation';

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.mainWrapper}>
      <aside className={classes.aside}>
        <Navigation />
      </aside>
      <main className={classes.main}>{children}</main>
    </div>
  );
};
