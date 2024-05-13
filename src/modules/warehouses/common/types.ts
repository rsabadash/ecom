import { DropdownItemObject } from '../../../components/Fields/Dropdown';
import { WAREHOUSE_TYPES } from './constants';

export type WarehouseType = ValuesOfObject<typeof WAREHOUSE_TYPES>;

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
  handleFormReset: () => void;
  handleFormSubmit: WarehouseFormSubmitAction;
};

export type WarehouseStateFromRouter = Warehouse | null;

export type WarehousePostData = {
  name: string;
  type: WarehouseType;
  address: string | null;
};

export type WarehousePostResponse = Warehouse;

export type WarehousePatchData = Omit<Warehouse, '_id'> & {
  id: string;
};

export type WarehouseDeleteData = {
  id: string;
};
