import { POST } from '../../../common/utils/api';
import { SupplyPostData, SupplyPostResponse } from './types';
import { endpoints } from '../../../common/constants/api';

export const createSupplyApi = async (
  data: SupplyPostData,
): Promise<any | undefined> => {
  return await POST<SupplyPostResponse, SupplyPostData>(
    endpoints.supplies.root,
    { data },
  );
};
