import { FC } from 'react';

import { ReactComponent as VerticalDotsIcon } from '../../../assets/icons/VerticalDots.svg';
import { useTranslation } from '../../../components/IntlProvider';
import { Menu, MenuItem } from '../../../components/Menu';
import { SupplyProductActionsProps } from './types';

import classes from './styles/index.module.css';

export const SupplyProductActions: FC<SupplyProductActionsProps> = ({
  rowIndex,
  onRemoveProduct,
}) => {
  const { translate } = useTranslation();

  const items: MenuItem[] = [
    {
      id: 'delete',
      Component: () => <>{translate('delete')}</>,
      action: () => {
        onRemoveProduct(rowIndex);
      },
    },
  ];

  return (
    <Menu items={items} alignment="pull">
      <div className={classes.supplyProducts__actionButton}>
        <VerticalDotsIcon />
      </div>
    </Menu>
  );
};
