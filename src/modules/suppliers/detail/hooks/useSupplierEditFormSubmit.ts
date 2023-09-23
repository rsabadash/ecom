import { useCallback } from 'react';

import { SupplierFormValues } from '../../common/types';
import { SupplierPatchData } from '../types';
import { useUpdateSupplier } from './useUpdateSupplier';

type UseSupplierEditFormSubmitProps = {
  id?: string;
  onFormUpdated: () => void;
};

type UseSupplierEditFormSubmitReturn = {
  handleFormSubmit: (values: SupplierFormValues) => Promise<void>;
};

export const useSupplierEditFormSubmit = ({
  id,
  onFormUpdated,
}: UseSupplierEditFormSubmitProps): UseSupplierEditFormSubmitReturn => {
  const { updateSupplier } = useUpdateSupplier({ onFormUpdated });

  const handleFormSubmit = useCallback(
    async (values: SupplierFormValues) => {
      if (id) {
        const data: SupplierPatchData = {
          id,
          ...values,
        };

        await updateSupplier(data);
      }
    },
    [id, updateSupplier],
  );

  return { handleFormSubmit };
};
