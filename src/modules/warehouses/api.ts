import { PATCH, POST } from '../../utils/api';
import { endpoints } from '../../common/constants/api';
import {
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
