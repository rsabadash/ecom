import { FC } from 'react';

import { ReactComponent as VerticalDotsIcon } from '../../../../assets/icons/VerticalDots.svg';
import { useTranslation } from '../../../../components/IntlProvider';
import { Menu, MenuItem } from '../../../../components/Menu';
import { AttributeDetailActionsProps } from './types';

import classes from './styles/index.module.css';

export const AttributeDetailActions: FC<AttributeDetailActionsProps> = ({
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
        itemClassName: classes.attributeDetail__actionButton_delete,
      },
    },
  ];

  return (
    <Menu
      items={items}
      alignment="pull"
      menuButtonClassName={classes.attributeDetail__menuButton}
    >
      <VerticalDotsIcon />
    </Menu>
  );
};
