import { endpoint } from '../../../common/constants/api';
import { DELETE } from '../../../utils/api';
import { SupplierDeleteData } from '../types';

export const useDeleteSupplier = () => {
  const deleteSupplier = async (id: string) => {
    return await DELETE<void, SupplierDeleteData>({
      url: endpoint.suppliers,
      data: { id },
    });
  };

  return { deleteSupplier };
};
