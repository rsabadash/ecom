import {
  VariantDeleteData,
  VariantPatchData,
  VariantPostData,
  VariantPostResponse,
} from './types';
import { endpoints } from '../../../common/constants/api';
import { DELETE, PATCH, POST } from '../../../common/utils/api';

export const createVariantApi = async (
  data: VariantPostData,
): Promise<VariantPostResponse | undefined> => {
  return await POST<VariantPostResponse, VariantPostData>(
    endpoints.attributes.variants,
    {
      data,
    },
  );
};

export const updateVariantApi = async (
  data: VariantPatchData,
): Promise<void> => {
  await PATCH<void, VariantPatchData>(endpoints.attributes.variants, {
    data,
  });
};

export const deleteVariantApi = async (
  variantId: string | undefined,
): Promise<void> => {
  if (variantId) {
    return await DELETE<void, VariantDeleteData>(
      endpoints.attributes.variants,
      {
        data: { variantId },
      },
    );
  }
};
