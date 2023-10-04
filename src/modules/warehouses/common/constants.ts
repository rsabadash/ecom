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
} as const;

export const WAREHOUSE_TYPE_KEYS = Object.keys(
  warehouseTypes,
) as WarehouseType[];

export const warehouseTypeTranslationPrefix = 'warehouse.type.';
