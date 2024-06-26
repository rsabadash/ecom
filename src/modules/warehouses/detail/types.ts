import { WarehouseFormDefaultValues } from '../common/types';

export type WarehouseEditFormProps = {
  id: string | undefined;
  isReadOnly: boolean;
  defaultValues: WarehouseFormDefaultValues | undefined;
  onFormReset: () => void;
  onFormUpdated: () => void;
};

export type WarehouseUrlParams = {
  warehouseId: string;
};
