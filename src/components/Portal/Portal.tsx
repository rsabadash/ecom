import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  let container = document.getElementById('test');

  if (!container) {
    container = document.createElement('div');
    container.id = 'test';
    document.body.appendChild(container);
  }

  return createPortal(children, container);
};
