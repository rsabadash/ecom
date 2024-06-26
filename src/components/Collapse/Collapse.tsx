import { FC, useRef } from 'react';

import { CollapseBuilderBody } from './CollapseBuilderBody';
import { CollapseBuilderHeader } from './CollapseBuilderHeader';
import { CollapseController } from './CollapseController';
import { CollapseProps } from './types';

export const Collapse: FC<CollapseProps> = ({
  header,
  body,
  forceExpand,
  forceCollapse,
  isInitiallyExpand = false,
  isToggleHidden,
  isToggleableHeader,
  isCollapseDisabled,
  isBodyLoaded,
  waitUntilBodyLoaded,
  onBeforeExpand,
  onBeforeCollapse,
  onExpand,
  onCollapse,
  onExpandFinished,
  onCollapseFinished,
  tabIndex,
  ariaLabel,
  ariaControls,
  headerClassName,
  bodyClassName,
}) => {
  const collapseBodyRef = useRef<null | HTMLDivElement>(null);

  return (
    <CollapseController
      forceExpand={forceExpand}
      forceCollapse={forceCollapse}
      isBodyLoaded={isBodyLoaded}
      waitUntilBodyLoaded={waitUntilBodyLoaded}
      isInitiallyExpand={isInitiallyExpand}
      onBeforeExpand={onBeforeExpand}
      onBeforeCollapse={onBeforeCollapse}
      onExpand={onExpand}
      onCollapse={onCollapse}
      onExpandFinished={onExpandFinished}
      onCollapseFinished={onCollapseFinished}
      ariaLabel={ariaLabel}
      ariaControls={ariaControls}
      collapseBodyRef={collapseBodyRef}
    >
      <CollapseBuilderHeader
        tabIndex={tabIndex}
        isToggleHidden={isToggleHidden}
        isToggleableHeader={isToggleableHeader}
        isCollapseDisabled={isCollapseDisabled}
        headerClassName={headerClassName}
      >
        {header}
      </CollapseBuilderHeader>
      <CollapseBuilderBody
        id={ariaControls}
        ref={collapseBodyRef}
        collapseBodyClassName={bodyClassName}
      >
        {body}
      </CollapseBuilderBody>
    </CollapseController>
  );
};
