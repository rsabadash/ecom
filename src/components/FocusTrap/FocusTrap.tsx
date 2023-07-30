import {
  FC,
  FocusEvent,
  PropsWithChildren,
  useLayoutEffect,
  useRef,
} from 'react';

import { FocusTrapProps } from './types';
import { focusFirstDescendant, focusLastDescendant } from './utils';

export const FocusTrap: FC<PropsWithChildren<FocusTrapProps>> = ({
  children,
  rootElement,
  onFocusTrapInit,
  onFocusTrapTerminate,
}) => {
  // const firstFocusableRef = useRef<null | HTMLElement>(null);
  // const lastFocusableRef = useRef<null | HTMLElement>(null);
  const firstTrapRef = useRef<null | HTMLDivElement>(null);
  const lastTrapRef = useRef<null | HTMLDivElement>(null);

  useLayoutEffect(() => {
    onFocusTrapInit && onFocusTrapInit();

    if (rootElement.current) {
      // console.time('useEffect focus');
      focusFirstDescendant(rootElement.current);

      // const focusableElements = rootElement.current.querySelectorAll(
      //   'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      // ) as NodeListOf<HTMLElement>;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // focusableElements[0].focus();

      // firstFocusableRef.current = focusableElements[0];
      // lastFocusableRef.current =
      //   focusableElements[focusableElements.length - 1];

      // console.timeEnd('useEffect focus');
    }

    return () => {
      onFocusTrapTerminate && onFocusTrapTerminate();
    };
  }, [onFocusTrapInit, onFocusTrapTerminate, rootElement]);

  // const handleOnTrapFocus = (event: FocusEvent): void => {
  //   const { target } = event;
  //
  //   if (target === firstTrapRef.current && lastFocusableRef.current) {
  //     console.time('handleOnTrapFocus first focus');
  //     lastFocusableRef.current.focus();
  //     console.timeEnd('handleOnTrapFocus first focus');
  //     return;
  //   }
  //
  //   if (target === lastTrapRef.current && firstFocusableRef.current) {
  //     console.time('handleOnTrapFocus second focus');
  //     firstFocusableRef.current.focus();
  //     console.timeEnd('handleOnTrapFocus second focus');
  //   }
  // };

  const handleOnTrapFocus = (event: FocusEvent): void => {
    const { target } = event;

    if (target === firstTrapRef.current && rootElement.current) {
      // console.time('handleOnTrapFocus first focus');
      focusLastDescendant(rootElement.current);
      // console.timeEnd('handleOnTrapFocus first focus');
      return;
    }

    if (target === lastTrapRef.current && rootElement.current) {
      // console.time('handleOnTrapFocus second focus');
      focusFirstDescendant(rootElement.current);
      // console.timeEnd('handleOnTrapFocus second focus');
    }
  };

  return (
    <>
      <div tabIndex={0} ref={firstTrapRef} onFocus={handleOnTrapFocus} />
      {children}
      <div tabIndex={0} ref={lastTrapRef} onFocus={handleOnTrapFocus} />
    </>
  );
};
