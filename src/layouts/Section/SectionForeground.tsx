import { FC, PropsWithChildren } from 'react';
import { Foreground } from '../Foreground';
import { SectionForegroundProps } from './types';
import { Section } from './Section';

export const SectionForeground: FC<
  PropsWithChildren<SectionForegroundProps>
> = ({ children, foregroundClassName }) => {
  return (
    <Section>
      <Foreground foregroundClassName={foregroundClassName}>
        {children}
      </Foreground>
    </Section>
  );
};
