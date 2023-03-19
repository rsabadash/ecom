import { POST } from '../../utils/api';
import { endpoints } from '../../common/constants/api';
import { WarehousePostData, WarehousePostResponse } from './types';

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
