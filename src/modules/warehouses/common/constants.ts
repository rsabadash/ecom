import { WarehouseFormFields } from './types';

export const warehouseFormFields: WarehouseFormFields = {
  name: 'name',
  type: 'type',
  address: 'address',
};

export const WAREHOUSE_TYPES = {
  SHOP: 'shop',
  ONLINE_STORE: 'onlineStore',
  WAREHOUSE: 'warehouse',
} as const;

export const WAREHOUSE_TYPE_KEYS = Object.values(WAREHOUSE_TYPES);

export const warehouseTypeTranslationPrefix = 'warehouse.type.';
