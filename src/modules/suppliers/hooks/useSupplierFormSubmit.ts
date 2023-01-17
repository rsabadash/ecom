import {
  SupplierFormValues,
  SupplierPatchData,
  SupplierPostData,
  SupplierPostResponse,
} from '../types';
import { endpoint } from '../../../common/constants/api';
import { PATCH, POST } from '../../../utils/api';

type useSupplierFormSubmit = (
  id: string | undefined,
  handleButtonEditClick: (() => void) | undefined,
) => { handleFormSubmit: (data: SupplierFormValues) => Promise<void> };

export const useSupplierFormSubmit: useSupplierFormSubmit = (
  id,
  handleButtonEditClick,
) => {
  const handleFormSubmit = async (data: SupplierFormValues) => {
    if (id) {
      await PATCH<any, SupplierPatchData>({
        url: endpoint.suppliers,
        data: { id, ...data },
      });

      handleButtonEditClick && handleButtonEditClick();
    } else {
      await POST<SupplierPostResponse, SupplierPostData>({
        url: endpoint.suppliers,
        data,
      });
    }
  };

  return { handleFormSubmit };
};
