import { forwardRef, KeyboardEvent } from 'react';
import clsx from 'clsx';

import { EventKeys } from '../../../common/enums/events';
import {
  CollapseBuilderBody,
  useCollapseController,
} from '../../../components/Collapse';
import { CollapseBuilderHeader } from '../../../components/Collapse/CollapseBuilderHeader';
import { ProductsListAttributes } from './ProductsListAttributes';
import { ProductsListItemRowProps } from './types';

import classes from './styles/index.module.css';

export const ProductsListItemRow = forwardRef<
  HTMLDivElement,
  ProductsListItemRowProps
>(({ children, item, rowProps }, ref) => {
  const { isExpand, expand, collapse } = useCollapseController();

  const { className, ...restRowProps } = rowProps;
  const tableRowClassNames = clsx(className, classes.warehouseListRow);

  const hasAttributes = !!item.attributes?.length;
  const isExpanded = hasAttributes ? isExpand : undefined;

  const handleRowKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (hasAttributes) {
      const key = event.key as EventKeys;

      if (key === EventKeys.Enter) {
        if (isExpanded) {
          collapse();
        } else {
          expand();
        }
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
          <ProductsListAttributes item={item} />
        </div>
      </CollapseBuilderBody>
    </div>
  );
});

ProductsListItemRow.displayName = 'ProductsListItemRow';
