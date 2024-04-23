import { FC, PropsWithChildren } from 'react';

import { useAuth } from '../../components/AuthProvider';
import { Button } from '../../components/Button';
import { useTranslation } from '../../components/IntlProvider';
import { Navigation, navigationItems } from '../../components/Navigation';
import { Header } from '../Header';

import classes from './styles/index.module.css';

export const Main: FC<PropsWithChildren> = ({ children }) => {
  const { translate } = useTranslation();
  const { signOut } = useAuth();

  return (
    <div className={classes.mainWrapper}>
      <aside className={classes.aside}>
        <Navigation navigationItems={navigationItems} />
        <Button variant="primary" onClick={signOut}>
          {translate('signOut')}
        </Button>
      </aside>
      <Header headerClassName={classes.header} />
      <main className={classes.main}>{children}</main>
    </div>
  );
};
