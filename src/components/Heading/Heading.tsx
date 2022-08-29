import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { HeadingProps } from './types';
import { DEFAULT_FONT_SIZE, DEFAULT_LEVEL, levelTagMap } from './constatns';
import classes from './styles/index.module.css';

const Heading: FC<PropsWithChildren<HeadingProps>> = (
    {
        id,
        level = DEFAULT_LEVEL,
        fontSize = DEFAULT_FONT_SIZE,
        classNameHeading,
        children
    }
) => {
    const HeadingTag = levelTagMap[level];

    return (
        <HeadingTag id={id} className={clsx(classes[`heading-${fontSize}`], classNameHeading)}>
            {children}
        </HeadingTag>
    );
};

export default Heading;