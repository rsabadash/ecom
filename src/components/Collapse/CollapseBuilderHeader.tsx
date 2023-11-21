import { FC, MouseEvent } from 'react';
import clsx from 'clsx';

import { CollapseBuilderButton } from './CollapseBuilderButton';
import { useCollapseController } from './CollapseController';
import { CollapseBuilderHeaderProps } from './types';

import classes from './styles/index.module.css';

export const CollapseBuilderHeader: FC<CollapseBuilderHeaderProps> = ({
  children,
  isToggleHidden,
  isToggleableHeader,
  isCollapseDisabled,
  headerClassName,
}) => {
  const { isExpand, expand, collapse } = useCollapseController();

  const handleHeaderClick = async (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (!isCollapseDisabled) {
      if (isExpand) {
        collapse();
      } else {
        expand();
      }
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
