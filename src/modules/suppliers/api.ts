import { DELETE, PATCH, POST } from '../../utils/api';
import {
  SupplierDeleteData,
  SupplierFormValues,
  SupplierPatchData,
  SupplierPostData,
  SupplierPostResponse,
} from './types';
import { endpoint } from '../../common/constants/api';

export const createSupplierApi = async (
  data: SupplierFormValues,
): Promise<SupplierPostResponse> => {
  return await POST<SupplierPostResponse, SupplierPostData>({
    url: endpoint.suppliers,
    data,
  });
};

export const updateSupplierApi = async (
  id: string,
  data: SupplierFormValues,
): Promise<void> => {
  return await PATCH<any, SupplierPatchData>({
    url: endpoint.suppliers,
    data: { id, ...data },
  });
};

export const deleteSupplierApi = async (id: string): Promise<void> => {
  return await DELETE<void, SupplierDeleteData>({
    url: endpoint.suppliers,
    data: { id },
  });
};
