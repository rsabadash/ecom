import { useCallback } from 'react';

import {
  CategoryFormSubmitAction,
  CategoryFormValues,
  CategoryPatchData,
} from '../../common/types';
import { getCategoryId } from '../../common/utils';
import { useUpdateCategory } from './useUpdateCategory';

type UseCategoryEditFormSubmitProps = {
  id: string | undefined;
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
        const { parent, ...restValues } = values;

        const data: CategoryPatchData = {
          id,
          ...restValues,
          parentId: getCategoryId(parent),
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
