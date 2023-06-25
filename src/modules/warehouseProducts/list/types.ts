import { Translations } from '../../../components/IntlProvider';
import { TableBodyRowProps } from '../../../components/Table/types';
import { Unit } from '../../../common/types/unit';

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
  unit: Unit;
  attributes: null | WarehouseProductsAttribute[];
  groupId: null | string;
  groupName: null | string;
  createdDate: Date;
};

export type WarehouseProductTable = Pick<
  WarehouseProduct,
  'name' | 'sku' | 'unit' | 'attributes'
> & {
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
