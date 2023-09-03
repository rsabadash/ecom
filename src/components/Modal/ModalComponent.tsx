import {
  FC,
  KeyboardEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import { ReactComponent as CloseIcon } from '../../assets/icons/Close.svg';
import { EventKeys } from '../../common/enums/events';
import {
  useOutsideElementClick,
  usePreviousActiveElement,
} from '../../common/hooks';
import { Overlay } from '../../layouts/Overlay';
import { Button } from '../Button';
import { FocusTrap } from '../FocusTrap';
import { Heading } from '../Heading';
import { useTranslation } from '../IntlProvider';
import { ModalComponentProps } from './types';

import classes from './styles/index.module.css';

const MODAL_LABEL_ID = Date.now().toString();
const MODAL_DESCRIPTION_ID = `${MODAL_LABEL_ID}Description`;

const ModalComponent: FC<ModalComponentProps> = ({
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
  const [isInitiated, setIsInitiated] = useState<boolean>(false);

  const modalContentRef = useRef<null | HTMLDivElement>(null);

  const { translate } = useTranslation();

  const {
    savePreviousActiveElement,
    focusPreviousActiveElement,
    removePreviousActiveElement,
  } = usePreviousActiveElement();

  const onKeyboardClose = useCallback(() => {
    focusPreviousActiveElement();
    onClose();
  }, [focusPreviousActiveElement, onClose]);

  useOutsideElementClick({
    ref: modalContentRef,
    dependency: isInitiated,
    listenKeyboard: true,
    listenInteraction: true,
    handleClick: onKeyboardClose,
  });

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';
    setIsInitiated(isOpen);

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleOnIconKeydown = (e: KeyboardEvent<HTMLDivElement>): void => {
    const key = e.key as EventKeys;

    if (key === EventKeys.Enter) {
      e.stopPropagation();
      onKeyboardClose();
    }
  };

  const modalClassNames = clsx(classes.modal, {
    [classes.modal_open]: isInitiated,
  });

  const modalContainerClassNames = clsx(classes.modal__container, {
    [classes.modal__container_noFooter]: isModalFooterHidden,
  });

  const allowCloseButtonFocus =
    isInitiated || (isNoFocusableElements && isModalFooterHidden);

  return (
    <Overlay hasPointer>
      <FocusTrap
        rootElement={modalContentRef}
        onFocusTrapInit={savePreviousActiveElement}
        onFocusTrapTerminate={removePreviousActiveElement}
      >
        <div
          role={type}
          aria-modal={true}
          aria-labelledby={MODAL_LABEL_ID}
          aria-describedby={MODAL_DESCRIPTION_ID}
          className={modalClassNames}
          ref={modalContentRef}
        >
          <div
            // to avoid autofocus when the modal window was just opened
            tabIndex={allowCloseButtonFocus ? 0 : -1}
            className={classes.modal__icon}
            aria-description={translate('modal.close')}
            onClick={onClose}
            onKeyDown={handleOnIconKeydown}
          >
            <CloseIcon />
          </div>
          <div className={modalContainerClassNames}>
            {title && (
              <div className={classes.modal__title}>
                <Heading id={MODAL_LABEL_ID} level={2} fontSize={6}>
                  {title}
                </Heading>
              </div>
            )}
            <div id={MODAL_DESCRIPTION_ID} className={classes.modal__content}>
              {children}
            </div>
            {!isModalFooterHidden && (
              <div className={classes.modal__footer}>
                <Button variant="primary" onClick={onConfirm}>
                  {confirmText || translate('approve')}
                </Button>
                <Button
                  variant="theme"
                  onClick={onClose}
                  onKeyDown={onKeyboardClose}
                >
                  {declineText || translate('cancel')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </FocusTrap>
    </Overlay>
  );
};

export default ModalComponent;
