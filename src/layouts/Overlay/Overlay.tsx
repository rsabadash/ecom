import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import classes from './styles/index.module.css';

import { OverlayProps } from './types';

export const Overlay: FC<PropsWithChildren<OverlayProps>> = ({
  children,
  hasPointer,
}) => {
  const overlayClassNames = clsx(classes.overlay, {
    [classes.overlay_pointer]: hasPointer,
  });

  return <div className={overlayClassNames}>{children}</div>;
};
