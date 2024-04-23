import { PropsWithChildren } from 'react';

import { ForegroundProps } from '../Foreground/types';

export type SectionProps = PropsWithChildren<{
  sectionLabeledBy?: string;
}>;

export type SectionForegroundProps = SectionProps & ForegroundProps;
