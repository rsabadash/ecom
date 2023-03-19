import { Translations } from '../../../components/IntlProvider';
import { TableBodyRowProps } from '../../../components/Table/types';

export type WarehouseProductsVariant = {
  variantId: string;
  name: Translations;
};

export type WarehouseProductsAttribute = {
  attributeId: string;
  name: Translations;
  variants: WarehouseProductsVariant[];
};

export type WarehouseProduct = {
  _id: string;
  name: Translations;
  sku: string;
  attributes: null | WarehouseProductsAttribute[];
  groupId: null | string;
  groupName: null | string;
  createdDate: Date;
};

export type WarehouseProductTable = WarehouseProduct & {
  button: JSX.Element;
};

export type WarehouseProductsListItemProps = {
  item: WarehouseProduct;
  rowProps: TableBodyRowProps;
};

export type WarehouseProductsListItemRowProps = {
  item: WarehouseProduct;
  rowProps: TableBodyRowProps;
};

export type WarehouseProductsListAttributesProps = {
  item: WarehouseProduct;
};
