import { PropsWithChildren } from 'react';

import { TableBodyRowProps } from '../../../components/Table/types';
import { Product } from '../common/types';

export type ProductsVariant = {
  variantId: string;
  name: string;
};

export type ProductsAttribute = {
  attributeId: string;
  name: string;
  variants: ProductsVariant[];
};

export type ProductTable = Pick<
  Product,
  'name' | 'sku' | 'unit' | 'attributes'
> & {
  button: JSX.Element;
};

export type ProductsListItemProps = PropsWithChildren<{
  item: Product;
  rowProps: TableBodyRowProps;
}>;

export type ProductsListItemRowProps = PropsWithChildren<{
  item: Product;
  rowProps: TableBodyRowProps;
}>;

export type ProductsListAttributesProps = {
  item: Product;
};
