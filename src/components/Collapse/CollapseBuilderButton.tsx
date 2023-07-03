import { FC, MouseEvent } from 'react';
import clsx from 'clsx';
import { useCollapseController } from './CollapseController';
import { Button } from '../Button';
import { ReactComponent as ChevronDownIcon } from '../../assets/icons/ChevronDown.svg';
import { ReactComponent as ChevronUpIcon } from '../../assets/icons/ChevronUp.svg';
import { CollapseBuilderButtonProps } from './types';
import { DEFAULT_ICON_SIZE } from './constants';
import classes from './styles/index.module.css';

export const CollapseBuilderButton: FC<CollapseBuilderButtonProps> = ({
  iconSize = DEFAULT_ICON_SIZE,
  isCollapseDisabled,
  collapseButtonClassName,
}) => {
  const { ariaControls, ariaLabel, isExpand, toggleCollapse } =
    useCollapseController();

  const collapseButtonClassNames = clsx(
    classes.collapseButton,
    collapseButtonClassName,
  );

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleCollapse();
  };

  return (
    <Button
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
