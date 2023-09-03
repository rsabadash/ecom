import { FC } from 'react';

import { useTranslation } from '../../../components/IntlProvider';
import { Modal } from '../../../components/Modal';
import { SupplyProductsDuplicationsModalProps } from './types';

import classes from './styles/index.module.css';

export const SupplyProductsDuplicationsModal: FC<
  SupplyProductsDuplicationsModalProps
> = ({ data, isOpen, onClose }) => {
  const { translate } = useTranslation();

  return (
    <Modal
      isModalFooterHidden
      isNoFocusableElements
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={classes.supplyProducts__duplications}>
        {translate('supply.productDuplication')}
        <ul className={classes.supplyProducts__duplicationsList}>
          {Object.keys(data).map((key) => {
            const { product, positions } = data[key];

            return (
              <li key={key}>
                {translate('supply.productDuplication.position', {
                  name: product.name?.value || '',
                  numbers: positions.join(', '),
                })}
              </li>
            );
          })}
        </ul>
        {translate('supply.productDuplication.fix')}
      </div>
    </Modal>
  );
};
