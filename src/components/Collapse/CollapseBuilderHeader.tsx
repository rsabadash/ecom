import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import { CollapseBuilderButton } from './CollapseBuilderButton';
import { useCollapseController } from './CollapseController';
import { CollapseBuilderHeaderProps } from './types';

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
  const { isExpand, toggleCollapse } = useCollapseController();

  const handleHeaderClick = () => {
    if (isToggleableHeader && !isCollapseDisabled) {
      toggleCollapse();
    }
  };

  const headerClassNames = clsx(
    classes.collapseHeader,
    {
      [classes.collapseHeader_toggleable]: isToggleableHeader,
    },
    headerClassName,
  );

  return (
    <div
      className={headerClassNames}
      onClick={handleHeaderClick}
      aria-expanded={isExpand}
    >
      {children}
      {!isToggleHidden && (
        <CollapseBuilderButton isCollapseDisabled={isCollapseDisabled} />
      )}
    </div>
  );
};
