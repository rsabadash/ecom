import { deleteSupplierApi } from '../api';

export const useDeleteSupplier = (): {
  deleteSupplier: (id: string) => void;
} => {
  const deleteSupplier = (id: string) => {
    deleteSupplierApi(id);
    //notification redirect etc
  };

  return { deleteSupplier };
};
