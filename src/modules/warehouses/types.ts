import { DropdownItemObject } from '../../components/Fields/Dropdown';

export type WarehouseType = 'shop' | 'warehouse' | 'onlineStore';

export type WarehouseFormValues = {
  name: string;
  type: DropdownItemObject<string, WarehouseType>;
  address?: string | null;
};

export type WarehouseFormFields = Record<
  keyof WarehouseFormValues,
  keyof WarehouseFormValues
>;
