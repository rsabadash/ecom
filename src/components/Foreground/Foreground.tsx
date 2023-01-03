import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { ForegroundProps } from './types';
import classes from './styles/index.module.css';

const Foreground: FC<PropsWithChildren<ForegroundProps>> = (
    {
        children,
        foregroundClassName
    }
) => {
    return (
        <div className={clsx(classes.foreground, foregroundClassName)}>
            {children}
        </div>
    );
};

export { Foreground };