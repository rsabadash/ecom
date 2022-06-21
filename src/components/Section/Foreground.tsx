import { FC, PropsWithChildren } from 'react';
import classes from './styles/index.module.css';

const Foreground: FC<PropsWithChildren<{}>> = (
    {
        children
    }
) => {
    return (
        <div className={classes.foreground}>
            {children}
        </div>
    );
};

export { Foreground };