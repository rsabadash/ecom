import { MutableRefObject } from 'react';

export type FocusTrapProps = {
  rootElement: MutableRefObject<HTMLElement | null>;
  onFocusTrapInit?: () => void;
  onFocusTrapTerminate?: () => void;
};
