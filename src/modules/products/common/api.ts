import { endpoints } from '../../../common/constants/api';
import { POST } from '../../../common/utils/api';
import { ProductsPostData, ProductsPostResponse } from './types';

export const createProductsApi = async (
  data: ProductsPostData,
): Promise<ProductsPostResponse | undefined> => {
  return await POST<ProductsPostResponse, ProductsPostData>(
    endpoints.products.root,
    {
      data,
    },
  );
};
