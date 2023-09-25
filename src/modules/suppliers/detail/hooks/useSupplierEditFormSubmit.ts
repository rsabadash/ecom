import { useCallback } from 'react';

import {
  SupplierFormSubmitAction,
  SupplierFormValues,
  SupplierPatchData,
} from '../../common/types';
import { useUpdateSupplier } from './useUpdateSupplier';

type UseSupplierEditFormSubmitProps = {
  id?: string;
  onFormUpdated: () => void;
};

type UseSupplierEditFormSubmitReturn = {
  handleFormSubmit: SupplierFormSubmitAction;
};

export const useSupplierEditFormSubmit = ({
  id,
  onFormUpdated,
}: UseSupplierEditFormSubmitProps): UseSupplierEditFormSubmitReturn => {
  const { updateSupplier } = useUpdateSupplier({ onSuccess: onFormUpdated });

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
