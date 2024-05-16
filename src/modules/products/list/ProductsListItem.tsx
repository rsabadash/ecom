import { FC, useRef } from 'react';

import { CollapseController } from '../../../components/Collapse';
import { ProductsListItemRow } from './ProductsListItemRow';
import { ProductsListItemProps } from './types';

export const ProductsListItem: FC<ProductsListItemProps> = ({
  children,
  item,
  rowProps,
}) => {
  const collapseBodyRef = useRef<HTMLDivElement | null>(null);
  console.log('collapseBodyRef', collapseBodyRef);
  return (
    <CollapseController collapseBodyRef={collapseBodyRef}>
      <ProductsListItemRow
        item={item}
        rowProps={rowProps}
        ref={collapseBodyRef}
      >
        {children}
      </ProductsListItemRow>
    </CollapseController>
  );
};
