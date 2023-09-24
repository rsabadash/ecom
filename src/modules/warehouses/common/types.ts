import { DropdownItemObject } from '../../../components/Fields/Dropdown';

export type WarehouseType = 'shop' | 'warehouse' | 'onlineStore';

export type Warehouse = {
  _id: string;
  name: string;
  type: WarehouseType;
  address: string | null;
};

export type WarehouseFormValues = {
  name: string;
  type: DropdownItemObject<string, WarehouseType>;
  address: string | null;
};

export type WarehouseFormFields = Record<
  keyof WarehouseFormValues,
  keyof WarehouseFormValues
>;

export type WarehouseFormDefaultValues = Partial<WarehouseFormValues>;

export type WarehouseFormSubmitAction = (
  values: WarehouseFormValues,
) => Promise<void>;

export type WarehouseFormProps = {
  submitText: string;
  isReadOnly?: boolean;
  defaultValues?: WarehouseFormDefaultValues;
  handleFormSubmit: WarehouseFormSubmitAction;
};

export type WarehouseStateFromRouter = Warehouse | null;
