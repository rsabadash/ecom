import { DELETE, PATCH, POST } from '../../utils/api';
import {
  SupplierDeleteData,
  SupplierPatchData,
  SupplierPostData,
  SupplierPostResponse,
} from './types';
import { endpoint } from '../../common/constants/api';

export const createSupplierApi = async (
  data: SupplierPostData,
): Promise<SupplierPostResponse> => {
  return await POST<SupplierPostResponse, SupplierPostData>({
    url: endpoint.suppliers,
    data,
  });
};

export const updateSupplierApi = async (
  data: SupplierPatchData,
): Promise<void> => {
  await PATCH<void, SupplierPatchData>({
    url: endpoint.suppliers,
    data,
  });
};

export const deleteSupplierApi = async (id: string): Promise<void> => {
  await DELETE<void, SupplierDeleteData>({
    url: endpoint.suppliers,
    data: { id },
  });
};
