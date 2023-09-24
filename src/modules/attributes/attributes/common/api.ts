import { endpoints } from '../../../../common/constants/api';
import { DELETE, PATCH, POST } from '../../../../common/utils/api';
import { AttributePostData, AttributePostResponse } from '../add/types';
import { AttributeDeleteData, AttributePatchData } from '../detail/types';

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

export const deleteAttributeApi = async (
  id: string | undefined,
): Promise<void> => {
  if (id) {
    return await DELETE<void, AttributeDeleteData>(endpoints.attributes.root, {
      data: { id },
    });
  }
};
