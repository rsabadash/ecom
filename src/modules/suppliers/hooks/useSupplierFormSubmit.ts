import { SupplierFormValues } from '../types';
import { createSupplierApi, updateSupplierApi } from '../api';

type UseSupplierFormSubmit = (id: string | undefined) => {
  handleFormSubmit: (data: SupplierFormValues) => void;
};

export const useSupplierFormSubmit: UseSupplierFormSubmit = (id) => {
  const handleFormSubmit = (data: SupplierFormValues) => {
    if (id) {
      updateSupplierApi(id, data);
      //notification redirect etc
    } else {
      createSupplierApi(data);
      //notification redirect etc
    }
  };

  return { handleFormSubmit };
};
