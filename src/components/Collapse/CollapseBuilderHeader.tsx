import { FC, KeyboardEvent, MouseEvent } from 'react';
import clsx from 'clsx';

import { EventKeys } from '../../common/enums/events';
import { CollapseBuilderButton } from './CollapseBuilderButton';
import { useCollapseController } from './CollapseController';
import { CollapseBuilderHeaderProps } from './types';

import classes from './styles/index.module.css';

export const CollapseBuilderHeader: FC<CollapseBuilderHeaderProps> = ({
  children,
  tabIndex,
  isToggleHidden,
  isToggleableHeader,
  isCollapseDisabled,
  headerClassName,
}) => {
  const { isExpand, expand, collapse } = useCollapseController();

  const handleHeaderClick = async (
    event: MouseEvent<HTMLDivElement> | undefined,
  ) => {
    event?.stopPropagation();

    if (!isCollapseDisabled) {
      if (isExpand) {
        collapse();
      } else {
        expand();
      }
    }
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const key = event.key as EventKeys;

    if (key === EventKeys.Enter) {
      handleHeaderClick(undefined);
    }
  };

  const headerTabIndex =
    isToggleableHeader && tabIndex !== undefined ? tabIndex : undefined;

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
      onKeyDown={handleOnKeyDown}
      aria-expanded={isExpand}
      tabIndex={headerTabIndex}
    >
      {children}
      {!isToggleHidden && (
        <CollapseBuilderButton
          tabIndex={tabIndex}
          isFocusable={!isToggleableHeader}
          isCollapseDisabled={isCollapseDisabled}
        />
      )}
    </div>
  );
};
