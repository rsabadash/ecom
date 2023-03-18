import { FC, useRef } from 'react';
import { CollapseProps } from './types';
import { CollapseBuilderBody } from './CollapseBuilderBody';
import { CollapseController } from './CollapseController';
import { CollapseBuilderHeader } from './CollapseBuilderHeader';

export const Collapse: FC<CollapseProps> = ({
  header,
  body,
  forceExpand,
  isInitiallyExpand = false,
  isToggleHidden,
  isToggleableHeader,
  isCollapseDisabled,
  renderBodyOnExpand,
  onExpandFinished,
  onCollapseFinished,
  ariaLabel,
  ariaControls,
  headerClassName,
  bodyClassName,
}) => {
  const collapseBodyRef = useRef<null | HTMLDivElement>(null);

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
      <CollapseBuilderHeader
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
        renderBodyOnExpand={renderBodyOnExpand}
        collapseBodyClassName={bodyClassName}
      >
        {body}
      </CollapseBuilderBody>
    </CollapseController>
  );
};
