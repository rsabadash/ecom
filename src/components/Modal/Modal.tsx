import { FC, lazy, Suspense } from 'react';

import { ModalProps } from './types';

const ModalComponent = lazy(() => import('./ModalComponent'));

export const Modal: FC<ModalProps> = ({
  type = 'dialog',
  title,
  isOpen,
  onClose,
  onConfirm,
  children,
  confirmText,
  declineText,
  isModalFooterHidden,
  isNoFocusableElements,
}) => {
  return (
    <>
      {isOpen && (
        <Suspense>
          <ModalComponent
            type={type}
            title={title}
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            confirmText={confirmText}
            declineText={declineText}
            isModalFooterHidden={isModalFooterHidden}
            isNoFocusableElements={isNoFocusableElements}
          >
            {children}
          </ModalComponent>
        </Suspense>
      )}
    </>
  );
};
