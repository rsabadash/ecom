import { FC, MouseEvent } from 'react';
import clsx from 'clsx';

import { ReactComponent as ChevronDownIcon } from '../../assets/icons/ChevronDown.svg';
import { ReactComponent as ChevronUpIcon } from '../../assets/icons/ChevronUp.svg';
import { Button } from '../Button';
import { useCollapseController } from './CollapseController';
import { DEFAULT_COLLAPSE_BUTTON_SIZE, DEFAULT_ICON_SIZE } from './constants';
import { CollapseBuilderButtonProps } from './types';

import classes from './styles/index.module.css';

export const CollapseBuilderButton: FC<CollapseBuilderButtonProps> = ({
  size = DEFAULT_COLLAPSE_BUTTON_SIZE,
  iconSize = DEFAULT_ICON_SIZE,
  isCollapseDisabled,
  collapseButtonClassName,
}) => {
  const { ariaControls, ariaLabel, isExpand, expand, collapse } =
    useCollapseController();

  const collapseButtonClassNames = clsx(
    classes.collapseButton,
    collapseButtonClassName,
  );

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!isCollapseDisabled) {
      if (isExpand) {
        collapse();
      } else {
        expand();
      }
    }
  };

  return (
    <Button
      size={size}
      onClick={handleButtonClick}
      ariaLabel={ariaLabel}
      ariaExpanded={isExpand}
      ariaControls={ariaControls}
      className={collapseButtonClassNames}
      tabIndex={isCollapseDisabled ? -1 : 0}
    >
      {isExpand ? (
        <ChevronUpIcon width={iconSize} height={iconSize} />
      ) : (
        <ChevronDownIcon width={iconSize} height={iconSize} />
      )}
    </Button>
  );
};
