import { DropdownItemObject } from '../../components/Fields/Dropdown';

export type Warehouse = {
  _id: string;
  name: string;
  type: WarehouseType;
  address: string | null;
};

export type WarehouseType = 'shop' | 'warehouse' | 'onlineStore';

export type WarehouseFormValues = {
  name: string;
  type: DropdownItemObject<string, WarehouseType>;
  address: string | null;
};

export type WarehouseFormFields = Record<
  keyof WarehouseFormValues,
  keyof WarehouseFormValues
>;

export type WarehousePostData = {
  name: string;
  type: WarehouseType;
  address: string | null;
};

export type WarehousePostResponse = Warehouse;

export type WarehouseUrlParams = {
  warehouseId: string;
};

export type WarehouseFormProps = {
  id?: string;
  isReadOnly?: boolean;
  defaultValues?: Partial<WarehouseFormValues>;
};
