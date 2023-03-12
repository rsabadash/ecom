import { FC, KeyboardEvent, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { CollapseBuilderHeaderProps } from './types';
import { useCollapseController } from './CollapseController';
import { CollapseBuilderButton } from './CollapseBuilderButton';
import { EventKeys } from '../../common/enums/events';
import classes from './styles/index.module.css';

export const CollapseBuilderHeader: FC<
  PropsWithChildren<CollapseBuilderHeaderProps>
> = ({
  children,
  isToggleHidden,
  isToggleableHeader,
  isCollapseDisabled,
  headerClassName,
}) => {
  const { toggleCollapse } = useCollapseController();

  const handleHeaderClick = () => {
    if (isToggleableHeader && !isCollapseDisabled) {
      toggleCollapse();
    }
  };

  const handleHeaderKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = event.key as EventKeys;

    if (isToggleableHeader && !isCollapseDisabled && key === EventKeys.Enter) {
      toggleCollapse();
    }
  };

  const headerClassNames = clsx(classes.collapseHeader, headerClassName);

  return (
    <div
      className={headerClassNames}
      onClick={handleHeaderClick}
      onKeyDown={handleHeaderKeyDown}
    >
      {children}
      {!isToggleHidden && (
        <CollapseBuilderButton isCollapseDisabled={isCollapseDisabled} />
      )}
    </div>
  );
};
