import { ElementType, PropsWithChildren } from 'react';

export type HeadingProps = PropsWithChildren<{
  id?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  fontSize?: 1 | 2 | 3 | 4 | 5 | 6;
  classNameHeading?: string;
}>;

export type LevelTagMap = {
  [key: number]: ElementType;
};
