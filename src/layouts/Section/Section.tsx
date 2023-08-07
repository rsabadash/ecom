import { FC } from 'react';

import { SectionProps } from './types';

import classes from './styles/index.module.css';

export const Section: FC<SectionProps> = ({ children, sectionLabeledBy }) => {
  return (
    <section className={classes.section} aria-labelledby={sectionLabeledBy}>
      {children}
    </section>
  );
};
