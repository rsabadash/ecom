import { FC } from 'react';
import { Menu, MenuItem } from '../../../components/Menu';
import { ReactComponent as VerticalDotsIcon } from '../../../assets/icons/VerticalDots.svg';
import { SupplyProductActionsProps } from './types';
import { useTranslation } from '../../../components/IntlProvider';

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
      <VerticalDotsIcon />
    </Menu>
  );
};
