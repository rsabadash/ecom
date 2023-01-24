import { FC, PropsWithChildren } from 'react';
import { Navigation } from '../../components/Navigation';
import classes from './styles/index.module.css';

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.mainWrapper}>
      <aside className={classes.aside}>
        <Navigation />
      </aside>
      <main className={classes.main}>
        <div className={classes.content}>{children}</div>
      </main>
    </div>
  );
};
