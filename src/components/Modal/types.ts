export type ModalProps = {
  isOpen: boolean;
  type?: 'dialog' | 'alertdialog';
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  declineText?: string;
  isModalFooterHidden?: boolean;
  isNoFocusableElements?: boolean;
};

export type ModalComponentProps = ModalProps;
