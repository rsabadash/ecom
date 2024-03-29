import { ReactNode } from 'react';

import { CollapseControllerProps } from '../Collapse';
import { Language } from '../IntlProvider';

export type RenderComponentArgs = {
  language: Language;
};

export type MultiLanguageProps = Omit<
  CollapseControllerProps,
  | 'onExpandFinished'
  | 'onCollapseFinished'
  | 'collapseBodyRef'
  | 'isToggleHidden'
> & {
  columnIndex?: number;
  collapseBodyId?: string;
  renderVisibleComponent: (args: RenderComponentArgs) => ReactNode;
  renderHiddenComponent: (args: RenderComponentArgs) => ReactNode;
};
