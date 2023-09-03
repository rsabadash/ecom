import { MutableRefObject, PropsWithChildren } from 'react';

export type FocusTrapProps = PropsWithChildren<{
  rootElement: MutableRefObject<HTMLElement | null>;
  onFocusTrapInit?: () => void;
  onFocusTrapTerminate?: () => void;
}>;
