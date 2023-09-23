import { endpoints } from '../../../common/constants/api';
import { DELETE, PATCH, POST } from '../../../common/utils/api';
import { SupplierPostData, SupplierPostResponse } from '../add/types';
import { SupplierDeleteData, SupplierPatchData } from '../detail/types';

export const createSupplierApi = async (
  data: SupplierPostData,
): Promise<SupplierPostResponse | undefined> => {
  return await POST<SupplierPostResponse, SupplierPostData>(
    endpoints.suppliers.root,
    {
      data,
    },
  );
};

export const updateSupplierApi = async (
  data: SupplierPatchData,
): Promise<void> => {
  await PATCH<void, SupplierPatchData>(endpoints.suppliers.root, {
    data,
  });
};

export const deleteSupplierApi = async (id: string): Promise<void> => {
  await DELETE<void, SupplierDeleteData>(endpoints.suppliers.root, {
    data: { id },
  });
};
