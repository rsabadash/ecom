import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { DropdownItemObject } from '../../components/Fields/Dropdown';
import { supplyFormArrayFields } from './constants';
import { ReactNode } from 'react';
import { TableColumnGeneric } from '../../components/Table';

export type SupplyFormValues = {
  name: string;
  supplier: DropdownItemObject;
  warehouse: DropdownItemObject;
  products: SupplyProduct[];
  productsTotalCost: string;
  productsTotalQuantity: number;
};

export type SupplyFormFields = Record<
  keyof SupplyFormValues,
  keyof SupplyFormValues
>;

export type SupplyFormProps = {
  id?: string;
  isReadOnly?: boolean;
  defaultValues?: Partial<SupplyFormValues>;
};

export type SupplyProduct = {
  name: DropdownItemObject | null;
  quantity: number | null;
  price: string | null;
  totalCost: string | null;
};

type SupplyProductKeys = keyof SupplyProduct;

export type RequiredSupplyProduct = {
  [K in SupplyProductKeys]: NonNullable<SupplyProduct[K]>;
};

export type SupplyFormSubFields = Record<
  keyof SupplyProduct,
  keyof SupplyProduct
>;

export type SupplyProductsListProps = {
  control: Control<SupplyFormValues>;
  setValue: UseFormSetValue<SupplyFormValues>;
  getValues: UseFormGetValues<SupplyFormValues>;
  onRemoveProduct: (index: number) => void;
  listData: SupplyProduct[];
  listCommonName: ValuesOfObject<typeof supplyFormArrayFields>;
  handleAddProduct: (value: SupplyProduct) => void;
};

export type SupplyProductListColumn = SupplyProduct & {
  ordinal: number;
  actions: ReactNode;
};

export type SupplyProductCellProps = {
  index: number;
  control: Control<SupplyFormValues>;
  setValue: UseFormSetValue<SupplyFormValues>;
  getValues: UseFormGetValues<SupplyFormValues>;
  fieldCommonName: ValuesOfObject<typeof supplyFormArrayFields>;
};

export type SupplyProductNameCellProps = Omit<
  SupplyProductCellProps,
  'setValue' | 'getValues'
>;

export type SupplyProductActionsProps = {
  rowIndex: number;
  onRemoveProduct: (index: number) => void;
};

export type SupplyProductSummaryProps = {
  columns: TableColumnGeneric<SupplyProductListColumn>[];
  control: Control<SupplyFormValues>;
};

export type SupplyPostProductData = {
  nameId: string;
  price: string;
  quantity: number;
  totalCost: string;
};

export type SupplyPostData = {
  name: string;
  products: SupplyPostProductData[];
  productsTotalCost: string;
  productsTotalQuantity: number;
  supplierId: string;
  warehouseId: string;
};

export type SupplyPostResponse = {

};
