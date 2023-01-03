import { FC, PropsWithChildren } from 'react';
import { Navigation } from '../../components/Navigation';
import classes from './styles/index.module.css';

const Main: FC<PropsWithChildren<{}>> = (
    {
        children
    }
) => {
    return (
        <div className={classes.mainWrapper}>
            <aside className={classes.aside}>
                <div className={classes.aside__logo}></div>
                <Navigation />
            </aside>
            <main className={classes.main}>
                <div className={classes.content}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export { Main };