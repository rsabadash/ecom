import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { HeadingProps } from './types';
import { levelTagMap } from './constatns';
import classes from './styles/index.module.css';

const Heading: FC<PropsWithChildren<HeadingProps>> = (
    {
        level = 1,
        fontSize = 1,
        classNameHeading,
        children
    }
) => {
    const HeadingTag = levelTagMap[level];

    return (
        <HeadingTag className={clsx(classes[`heading-${fontSize}`], classNameHeading)}>
            {children}
        </HeadingTag>
    );
};

export default Heading;