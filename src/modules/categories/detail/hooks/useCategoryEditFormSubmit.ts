import { useCallback } from 'react';

import {
  CategoryFormSubmitAction,
  CategoryFormValues,
} from '../../common/types';
import { getCategoryIds } from '../../common/utils';
import { CategoryPatchData } from '../types';
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
  const { updateCategory } = useUpdateCategory({ onFormUpdated });

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
