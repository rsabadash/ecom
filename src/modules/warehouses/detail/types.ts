import { WarehouseFormProps, WarehouseType } from '../common/types';

export type WarehouseEditFormProps = Pick<
  WarehouseFormProps,
  'defaultValues'
> & {
  id?: string;
  isReadOnly: boolean;
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
