import { FC, useRef } from 'react';

import { CollapseController } from '../../../components/Collapse';
import { WarehouseProductsListItemProps } from './types';
import { WarehouseProductsListItemRow } from './WarehouseProductsListItemRow';

export const WarehouseProductsListItem: FC<WarehouseProductsListItemProps> = ({
  children,
  item,
  rowProps,
}) => {
  const collapseBodyRef = useRef<HTMLDivElement | null>(null);

  return (
    <CollapseController collapseBodyRef={collapseBodyRef}>
      <WarehouseProductsListItemRow
        item={item}
        rowProps={rowProps}
        ref={collapseBodyRef}
      >
        {children}
      </WarehouseProductsListItemRow>
    </CollapseController>
  );
};
