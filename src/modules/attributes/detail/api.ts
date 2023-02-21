import {
  AttributeVariantDeleteData,
  AttributeVariantPatchData,
  AttributeVariantPostData,
  AttributeVariantPostResponse,
} from './types';
import { endpoints } from '../../../common/constants/api';
import { DELETE, PATCH, POST } from '../../../utils/api';
import { AttributeDeleteData } from '../common/types';

export const deleteAttributeApi = async (
  id: string | undefined,
): Promise<void> => {
  if (id) {
    return await DELETE<void, AttributeDeleteData>(endpoints.attributes.root, {
      data: { id },
    });
  }
};

export const createAttributeVariantApi = async (
  data: AttributeVariantPostData,
): Promise<AttributeVariantPostResponse | undefined> => {
  return await POST<AttributeVariantPostResponse, AttributeVariantPostData>(
    endpoints.attributes.variants,
    {
      data,
    },
  );
};

export const updateAttributeVariantApi = async (
  data: AttributeVariantPatchData,
): Promise<void> => {
  await PATCH<void, AttributeVariantPatchData>(endpoints.attributes.variants, {
    data,
  });
};

export const deleteAttributeVariantApi = async (
  variantId: string | undefined,
): Promise<void> => {
  if (variantId) {
    return await DELETE<void, AttributeVariantDeleteData>(
      endpoints.attributes.variants,
      {
        data: { variantId },
      },
    );
  }
};
