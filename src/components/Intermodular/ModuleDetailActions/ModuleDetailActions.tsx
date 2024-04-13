import { FC } from 'react';

import { ReactComponent as VerticalDotsIcon } from '../../../assets/icons/VerticalDots.svg';
import { useTranslation } from '../../IntlProvider';
import { Menu, MenuItem } from '../../Menu';
import { ModuleDetailActionsProps } from './types';

import classes from './styles/index.module.css';

export const ModuleDetailActions: FC<ModuleDetailActionsProps> = ({
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
        itemClassName: classes.moduleDetail__actionButton_delete,
      },
    },
  ];

  return (
    <Menu
      items={items}
      alignment="pull"
      menuButtonClassName={classes.moduleDetail__menuButton}
    >
      <VerticalDotsIcon />
    </Menu>
  );
};
