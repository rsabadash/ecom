import { endpoints } from '../../../common/constants/api';
import { POST } from '../../../common/utils/api';
import {
  WarehouseProductsPostData,
  WarehouseProductsPostResponse,
} from './types';

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
