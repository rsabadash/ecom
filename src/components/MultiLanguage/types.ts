import { ReactNode } from 'react';
import { Language } from '../IntlProvider';
import { CollapseControllerProps } from '../Collapse';

export type RenderComponentArgs = {
  language: Language;
};

export type RenderVisibleComponentArgs = RenderComponentArgs &
  Pick<CollapseControllerProps, 'collapseBodyRef'>;

export type MultiLanguageProps = {
  columnIndex?: number;
  collapseBodyId?: string;
  renderVisibleComponent: (args: RenderVisibleComponentArgs) => ReactNode;
  renderHiddenComponent: (args: RenderComponentArgs) => ReactNode;
};
