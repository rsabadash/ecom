import { ReactNode } from 'react';
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { DropdownItemObject } from '../../../components/Fields/Dropdown';
import { supplyFormArrayFields } from './constants';
import { TableColumnGeneric } from '../../../components/Table';
import { Unit } from '../../../common/types/unit';

export type SupplyFormValues = {
  name: string;
  supplier: DropdownItemObject;
  warehouse: DropdownItemObject;
  products: SupplyProduct[];
  productsTotalCost: string;
  productsTotalQuantity: string;
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

type SupplyProductMeta = {
  unit: Unit;
};

export type SupplyProduct = {
  name: DropdownItemObject<string, string, SupplyProductMeta> | null;
  unit: DropdownItemObject<string, Unit> | null;
  quantity: string | null;
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

export type ProductNameDropdownMeta = SupplyProductMeta;

export type SupplyProductUnitCellProps = Omit<
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
  productId: string;
  price: string;
  quantity: string;
  totalCost: string;
};

export type SupplyPostData = {
  name: string;
  products: SupplyPostProductData[];
  productsTotalCost: string;
  productsTotalQuantity: string;
  supplierId: string;
  warehouseId: string;
};

export type SupplyPostResponse = any;
