import { POST } from '../../../common/utils/api';
import {
  WarehouseProductsPostData,
  WarehouseProductsPostResponse,
} from './types';
import { endpoints } from '../../../common/constants/api';

export const createWarehouseProductsApi = async (
  data: WarehouseProductsPostData,
): Promise<WarehouseProductsPostResponse | undefined> => {
  return await POST<WarehouseProductsPostResponse, WarehouseProductsPostData>(
    endpoints.warehouseProducts.root,
    {
      data,
    },
  );
};
