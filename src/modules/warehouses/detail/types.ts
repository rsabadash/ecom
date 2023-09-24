import { WarehouseFormDefaultValues, WarehouseType } from '../common/types';

export type WarehouseEditFormProps = {
  id?: string;
  isReadOnly: boolean;
  defaultValues: WarehouseFormDefaultValues | undefined;
  onFormUpdated: () => void;
};

export type WarehouseUrlParams = {
  warehouseId: string;
};

export type WarehousePatchData = {
  id: string;
  name: string;
  type: WarehouseType;
  address: string | null;
};

export type WarehouseDeleteData = {
  id: string;
};
