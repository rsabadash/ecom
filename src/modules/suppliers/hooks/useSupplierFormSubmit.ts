import {
  SupplierFormValues,
  SupplierPatchData,
  SupplierPostData,
  SupplierPostResponse,
} from '../types';
import { endpoint } from '../../../common/constants/api';
import { PATCH, POST } from '../../../utils/api';

export const useSupplierFormSubmit = (id: string | undefined) => {
  const handleFormSubmit = async (data: SupplierFormValues) => {
    if (id) {
      await PATCH<any, SupplierPatchData>({
        url: endpoint.suppliers,
        data: { id, ...data },
      });
    } else {
      await POST<SupplierPostResponse, SupplierPostData>({
        url: endpoint.suppliers,
        data,
      });
    }
  };

  return { handleFormSubmit };
};
