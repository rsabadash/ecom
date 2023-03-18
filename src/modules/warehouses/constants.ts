import { WarehouseFormFields, WarehouseType } from './types';

export const warehouseFormFields: WarehouseFormFields = {
  name: 'name',
  type: 'type',
  address: 'address',
};

export const warehouseTypes: Record<WarehouseType, WarehouseType> = {
  shop: 'shop',
  onlineStore: 'onlineStore',
  warehouse: 'warehouse',
};

export const warehouseTypeKeys = Object.keys(warehouseTypes) as WarehouseType[];
