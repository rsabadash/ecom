import { DELETE, PATCH, POST } from '../../common/utils/api';
import { endpoints } from '../../common/constants/api';
import {
  WarehouseDeleteData,
  WarehousePatchData,
  WarehousePostData,
  WarehousePostResponse,
} from './types';

export const createWarehouseApi = async (
  data: WarehousePostData,
): Promise<WarehousePostResponse | undefined> => {
  return await POST<WarehousePostResponse, WarehousePostData>(
    endpoints.warehouses.root,
    {
      data,
    },
  );
};

export const updateWarehouseApi = async (
  data: WarehousePatchData,
): Promise<void> => {
  await PATCH<void, WarehousePatchData>(endpoints.warehouses.root, {
    data,
  });
};

export const deleteWarehouseApi = async (
  id: string | undefined,
): Promise<void> => {
  if (id) {
    return await DELETE<void, WarehouseDeleteData>(endpoints.warehouses.root, {
      data: { id },
    });
  }
};
