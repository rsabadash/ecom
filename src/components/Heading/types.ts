import { ElementType } from 'react';

export type HeadingProps = {
    level?: 1 | 2 | 3 | 4;
    fontSize?: 1 | 2 | 3 | 4;
    classNameHeading?: string;
};

export type LevelTagMap = {
    [key: number]: ElementType;
};