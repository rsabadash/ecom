import { FC } from 'react';

import { ReactComponent as VerticalDotsIcon } from '../../../assets/icons/VerticalDots.svg';
import { useTranslation } from '../../../components/IntlProvider';
import { Menu, MenuItem } from '../../../components/Menu';
import { CategoryDetailActionsProps } from './types';

import classes from './styles/index.module.css';

export const CategoryDetailActions: FC<CategoryDetailActionsProps> = ({
  onEdit,
  onDelete,
  isReadOnly,
}) => {
  const { translate } = useTranslation();

  const items: MenuItem[] = [
    ...(isReadOnly
      ? [
          {
            id: 'edit',
            Component: () => <>{translate('edit')}</>,
            action: onEdit,
          },
        ]
      : []),
    {
      id: 'delete',
      Component: () => <>{translate('delete')}</>,
      action: onDelete,
      componentProps: {
        itemClassName: classes.categoryDetail__actionButton_delete,
      },
    },
  ];

  return (
    <Menu
      items={items}
      alignment="pull"
      menuButtonClassName={classes.categoryDetail__menuButton}
    >
      <VerticalDotsIcon />
    </Menu>
  );
};
