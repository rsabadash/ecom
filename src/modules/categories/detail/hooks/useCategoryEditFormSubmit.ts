import { useCallback } from 'react';

import {
  CategoryFormSubmitAction,
  CategoryFormValues,
  CategoryPatchData,
} from '../../common/types';
import { getCategoryIds } from '../../common/utils';
import { useUpdateCategory } from './useUpdateCategory';

type UseCategoryEditFormSubmitProps = {
  id?: string;
  onFormUpdated: () => void;
};

type UseCategoryEditFormSubmitReturn = {
  handleFormSubmit: CategoryFormSubmitAction;
};

export const useCategoryEditFormSubmit = ({
  id,
  onFormUpdated,
}: UseCategoryEditFormSubmitProps): UseCategoryEditFormSubmitReturn => {
  const { updateCategory } = useUpdateCategory({ onSuccess: onFormUpdated });

  const handleFormSubmit = useCallback(
    async (values: CategoryFormValues) => {
      if (id) {
        const data: CategoryPatchData = {
          id,
          ...values,
          parentIds: getCategoryIds(values.parentIds),
        };

        await updateCategory(data);
      }
    },
    [id, updateCategory],
  );

  return {
    handleFormSubmit,
  };
};
