import { FC } from 'react';
import { Menu, MenuItem } from '../../components/Menu';
import { ReactComponent as VerticalDotsIcon } from '../../assets/icons/VerticalDots.svg';
import { SupplyProductActionsProps } from './types';

export const SupplyProductActions: FC<SupplyProductActionsProps> = ({
  rowIndex,
  onRemoveProduct,
}) => {
  // TODO Don't allow to delete item if only one in the row
  const items: MenuItem[] = [
    {
      id: 'delete',
      Component: () => <div>Delete</div>,
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
