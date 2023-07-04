import { forwardRef, KeyboardEvent, PropsWithChildren } from 'react';
import clsx from 'clsx';

import classes from './styles/index.module.css';

import { EventKeys } from '../../../common/enums/events';
import {
  CollapseBuilderBody,
  useCollapseController,
} from '../../../components/Collapse';
import { CollapseBuilderHeader } from '../../../components/Collapse/CollapseBuilderHeader';
import { WarehouseProductsListItemRowProps } from './types';
import { WarehouseProductsListAttributes } from './WarehouseProductsListAttributes';

export const WarehouseProductsListItemRow = forwardRef<
  HTMLDivElement,
  PropsWithChildren<WarehouseProductsListItemRowProps>
>(({ children, item, rowProps }, ref) => {
  const { isExpand, toggleCollapse } = useCollapseController();

  const { className, ...restRowProps } = rowProps;
  const tableRowClassNames = clsx(className, classes.warehouseListRow);

  const hasAttributes = !!item.attributes?.length;
  const isExpanded = hasAttributes ? isExpand : undefined;

  const handleRowKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (hasAttributes) {
      const key = event.key as EventKeys;

      if (key === EventKeys.Enter) {
        toggleCollapse();
      }
    }
  };

  return (
    <div
      {...restRowProps}
      className={tableRowClassNames}
      onKeyDown={handleRowKeyDown}
      aria-expanded={isExpanded}
    >
      <CollapseBuilderHeader
        isToggleHidden
        isToggleableHeader
        isCollapseDisabled={!hasAttributes}
        headerClassName={classes.warehouseListRowCollapseHeader}
      >
        {children}
      </CollapseBuilderHeader>
      <CollapseBuilderBody
        ref={ref}
        renderBodyOnExpand
        collapseBodyClassName={classes.warehouseListRowCollapseBody}
      >
        <div className={classes.warehouseListRowCollapseContent}>
          <WarehouseProductsListAttributes item={item} />
        </div>
      </CollapseBuilderBody>
    </div>
  );
});

WarehouseProductsListItemRow.displayName = 'WarehouseProductsListItemRow';
