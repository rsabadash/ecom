import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { SectionProps } from './types';
import classes from './styles/index.module.css';

const Section: FC<PropsWithChildren<SectionProps>> = (
    {
        children,
        placeholder
    }
) => {
    return (
        <section className={clsx(classes.foreground, classes.section)}>
            {children || <div className={classes.section__placeholder}>{placeholder}</div>}
        </section>
    );
};

export { Section };