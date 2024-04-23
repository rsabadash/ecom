import { FC } from 'react';
import clsx from 'clsx';

import { ReactComponent as SettingsIcon } from '../../assets/icons/Settings.svg';
import { routes } from '../../common/constants/routes';
import { ButtonLink } from '../../components/Button';
// import { ButtonIcon } from '../../components/Button';
import { HeaderProps } from './types';

import classes from './styles/index.module.css';

export const Header: FC<HeaderProps> = ({ headerClassName }) => {
  const headerClassNames = clsx(classes.header, headerClassName);

  return (
    <header className={headerClassNames}>
      <ButtonLink variant="theme" size="xs" to={routes.settings.root}>
        <SettingsIcon width="1.5em" height="1.5em" />
      </ButtonLink>
    </header>
  );
};
