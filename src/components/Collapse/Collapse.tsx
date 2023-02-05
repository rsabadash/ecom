import { FC, useRef } from 'react';
import clsx from 'clsx';
import { CollapseProps } from './types';
import { CollapseBuilderBody } from './CollapseBuilderBody';
import { CollapseBuilderButton } from './CollapseBuilderButton';
import { CollapseController } from './CollapseController';
import classes from './styles/index.module.css';

export const Collapse: FC<CollapseProps> = ({
  header,
  body,
  forceExpand,
  isInitiallyExpand = false,
  isToggleHidden,
  onExpandFinished,
  onCollapseFinished,
  ariaLabel,
  ariaControls,
  headerClassName,
  bodyClassName,
}) => {
  const collapseBodyRef = useRef<null | HTMLDivElement>(null);

  const headerClassNames = clsx(classes.collapseHeader, headerClassName);
  const bodyClassNames = clsx(classes.collapse__body, bodyClassName);

  return (
    <CollapseController
      forceExpand={forceExpand}
      isInitiallyExpand={isInitiallyExpand}
      onExpandFinished={onExpandFinished}
      onCollapseFinished={onCollapseFinished}
      ariaLabel={ariaLabel}
      ariaControls={ariaControls}
      collapseBodyRef={collapseBodyRef}
    >
      <div className={headerClassNames}>
        {header}
        {!isToggleHidden && <CollapseBuilderButton />}
      </div>
      <CollapseBuilderBody
        id={ariaControls}
        ref={collapseBodyRef}
        collapseBodyClassName={bodyClassNames}
      >
        {body}
      </CollapseBuilderBody>
    </CollapseController>
  );
};
