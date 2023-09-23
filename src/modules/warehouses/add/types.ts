import { Warehouse, WarehouseType } from '../common/types';

export type WarehousePostData = {
  name: string;
  type: WarehouseType;
  address: string | null;
};

export type WarehousePostResponse = Warehouse;
