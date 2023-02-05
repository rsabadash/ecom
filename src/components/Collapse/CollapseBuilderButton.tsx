import { FC } from 'react';
import clsx from 'clsx';
import { useCollapseController } from './CollapseController';
import { Button } from '../Button';
import { ReactComponent as ChevronDownIcon } from '../../assets/icons/ChevronDown.svg';
import { ReactComponent as ChevronUpIcon } from '../../assets/icons/ChevronUp.svg';
import { CollapseBuilderButtonProps } from './types';
import classes from './styles/index.module.css';

export const CollapseBuilderButton: FC<CollapseBuilderButtonProps> = ({
  collapseButtonClassName,
}) => {
  const { ariaControls, ariaLabel, isExpand, toggleCollapse } =
    useCollapseController();

  const collapseButtonClassNames = clsx(
    classes.collapseButton,
    collapseButtonClassName,
  );

  return (
    <Button
      onClick={toggleCollapse}
      ariaLabel={ariaLabel}
      ariaExpanded={isExpand}
      ariaControls={ariaControls}
      className={collapseButtonClassNames}
    >
      {isExpand ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Button>
  );
};
