import {
  AttributePatchData,
  AttributePostData,
  AttributePostResponse,
} from './types';
import { endpoints } from '../../../common/constants/api';
import { PATCH, POST } from '../../../utils/api';

export const createAttributeApi = async (
  data: AttributePostData,
): Promise<AttributePostResponse | undefined> => {
  return await POST<AttributePostResponse, AttributePostData>(
    endpoints.attributes.root,
    {
      data,
    },
  );
};

export const updateAttributeApi = async (
  data: AttributePatchData,
): Promise<void> => {
  await PATCH<void, AttributePatchData>(endpoints.attributes.root, {
    data,
  });
};
