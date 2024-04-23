import { FC } from 'react';

import { Foreground } from '../Foreground';
import { Section } from './Section';
import { SectionForegroundProps } from './types';

export const SectionForeground: FC<SectionForegroundProps> = ({
  children,
  sectionLabeledBy,
  foregroundClassName,
}) => {
  return (
    <Section sectionLabeledBy={sectionLabeledBy}>
      <Foreground foregroundClassName={foregroundClassName}>
        {children}
      </Foreground>
    </Section>
  );
};
