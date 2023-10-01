import { PropsWithChildren } from 'react';

import { Translations } from '../../../components/IntlProvider';
import { TableBodyRowProps } from '../../../components/Table/types';
import { WarehouseProduct } from '../common/types';

export type WarehouseProductsVariant = {
  variantId: string;
  name: Translations;
};

export type WarehouseProductsAttribute = {
  attributeId: string;
  name: Translations;
  variants: WarehouseProductsVariant[];
};

export type WarehouseProductTable = Pick<
  WarehouseProduct,
  'name' | 'sku' | 'unit' | 'attributes'
> & {
  button: JSX.Element;
};

export type WarehouseProductsListItemProps = PropsWithChildren<{
  item: WarehouseProduct;
  rowProps: TableBodyRowProps;
}>;

export type WarehouseProductsListItemRowProps = PropsWithChildren<{
  item: WarehouseProduct;
  rowProps: TableBodyRowProps;
}>;

export type WarehouseProductsListAttributesProps = {
  item: WarehouseProduct;
};
