import { PropsWithChildren } from 'react';

export type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  type?: 'dialog' | 'alertdialog';
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  declineText?: string;
  isModalFooterHidden?: boolean;
  isNoFocusableElements?: boolean;
}>;

export type ModalComponentProps = ModalProps;
